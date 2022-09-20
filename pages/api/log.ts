import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  add,
  differenceInDays,
  differenceInHours,
  isSameDay,
  startOfToday,
} from "date-fns";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { logs } = req.body;
      const today = startOfToday();
      const lastUserLog = await prisma.userLog.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
      if (lastUserLog && differenceInHours(today, lastUserLog.createdAt) > 24) {
        await prisma.user.update({
          where: {
            id: 1,
          },
          data: {
            streak: 0,
            lastLog: today,
          },
        });
      } else if (
        lastUserLog &&
        differenceInHours(today, lastUserLog.createdAt) < 24
      ) {
        const findUser = await prisma.user.findFirst({
          where: {
            id: 1,
          },
        });
        await prisma.user.update({
          where: {
            id: 1,
          },
          data: {
            streak: differenceInDays(lastUserLog.createdAt, findUser!.lastLog),
          },
        });
      }
      const userLog = await prisma.userLog.createMany({
        data: [...logs],
      });
      prisma.$disconnect;
      return res.status(200).json(userLog);
    case "GET":
      const userLogs = await prisma.userLog.groupBy({
        by: ["exerciseId"],
        where: {
          userId: 1,
        },
        _max: {
          weight: true,
        },
      });
      let records: {}[] = [];
      for (let i = 0; i < userLogs.length; i++) {
        let findWorkoutLine = await prisma.workoutLine.findFirst({
          where: {
            id: userLogs[i].exerciseId,
          },
        });
        let findExercise = await prisma.exercise.findFirst({
          where: {
            id: findWorkoutLine?.exerciseId,
          },
        });
        records[i] = {
          name: findExercise?.name,
          weight: userLogs[i]._max.weight,
        };
      }
      prisma.$disconnect;
      return res.status(200).json(records);
    default:
      break;
  }
}

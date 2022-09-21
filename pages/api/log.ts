import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  add,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isSameDay,
  startOfToday,
} from "date-fns";
import { prisma } from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { logs, userId } = req.body;
      const today = new Date();
      const findUser = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      const userLog = await prisma.userLog.createMany({
        data: [...logs],
      });
      if (findUser!.streak === 0) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            streak: Math.ceil(
              differenceInMinutes(today, findUser!.lastLog!) / 60 / 24
            ),
            lastLog: today,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            streak: Math.ceil(
              differenceInMinutes(today, findUser!.lastLog!) / 60 / 24
            ),
          },
        });
      }
      await prisma.$disconnect;
      return res.status(200).json(userLog);
    case "GET":
      const { id } = req.headers;
      const userLogs = await prisma.userLog.groupBy({
        by: ["exerciseId"],
        where: {
          userId: 2,
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
      await prisma.$disconnect;
      return res.status(200).json(records);
    default:
      break;
  }
}

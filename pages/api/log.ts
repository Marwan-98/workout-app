import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "POST":
      const { logs } = req.body;
      const userLog = await prisma.userLog.createMany({
        data: [...logs],
      });
      prisma.$disconnect;
      return res.status(200).json(userLog);
    case "GET":
      const userLogs = await prisma.userLog.groupBy({
        by: ["exerciseId"],
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

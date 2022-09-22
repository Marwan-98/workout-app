import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./db";
import { getYear, startOfToday } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      let updatedRecord: any = [];
      const { id, userid, prevmonths } = req.headers;
      const today = getYear(startOfToday());
      const prevMonthsArr = String(prevmonths)!.split(",");
      let recordArr = [];
      for (let i = 0; i < prevMonthsArr.length; i++) {
        let record = await prisma.userLog.groupBy({
          by: ["exerciseId"],
          where: {
            createdAt: {
              gte: new Date(`${today}-${prevMonthsArr[i]}-01`).toISOString(),
              lte: new Date(`${today}-${prevMonthsArr[i]}-28`).toISOString(),
            },
            exerciseId: +id!,
            userId: +userid!,
          },
          _avg: {
            weight: true,
          },
        });
        if (record[0]) {
          let exerciseName = await prisma.exercise.findFirst({
            where: {
              id: record[0].exerciseId,
            },
          });
          updatedRecord = [{ ...record[0], name: exerciseName!.name }];
        }
        recordArr.push(updatedRecord);
      }
      await prisma.$disconnect;
      return res.status(200).json(recordArr);
    default:
      break;
  }
}

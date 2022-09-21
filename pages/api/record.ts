import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      let updatedRecord: any = [];
      const { id, userid, year, month } = req.headers;
      let record = await prisma.userLog.groupBy({
        by: ["exerciseId"],
        where: {
          createdAt: {
            gte: new Date(`${year}-${month}-01`).toISOString(),
            lte: new Date(`${year}-${month}-28`).toISOString(),
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
      await prisma.$disconnect;
      return res.status(200).json(updatedRecord);
    default:
      break;
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const { date, id } = req.body;
      const record = await prisma.userLog.findMany({
        where: {
          createdAt: {
            gte: new Date("2022-09-01").toISOString(),
            lte: new Date("2022-09-30").toISOString(),
          },
          exerciseId: id,
        },
        include: {
          workoutLine: {
            include: {
              exercise: true,
            },
          },
        },
      });
      prisma.$disconnect;
      return res.status(200).json(record);
    default:
      break;
  }
}

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const exercise = await prisma.exercise.findUnique({
        where: {
          id: +req.headers.id!,
        },
        include: {
          workoutLines: true,
        },
      });
      prisma.$disconnect;
      return res.status(200).json(exercise);
      break;

    default:
      break;
  }
}

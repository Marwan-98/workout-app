import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const exercise = await prisma.exercise.findUnique({
        where: {
          id: +req.headers.id!,
        },
        include: {
          workoutLines: {
            where: {
              workoutId: +req.headers.workoutid!,
            },
          },
        },
      });
      prisma.$disconnect;
      return res.status(200).json(exercise);
    default:
      break;
  }
}

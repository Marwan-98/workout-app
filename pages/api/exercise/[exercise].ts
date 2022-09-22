import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../db";
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
      await prisma.$disconnect;
      return res.status(200).json(exercise);
    default:
      break;
  }
}

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { id } = req.headers;
      const workout = await prisma.workoutLine.findMany({
        where: {
          workoutId: +id!,
        },
        include: {
          exercise: true,
        },
      });
      await prisma.$disconnect;
      const exercises = workout.map((workout) => workout.exercise);
      return res.status(200).json([...exercises]);
    default:
      break;
  }
}

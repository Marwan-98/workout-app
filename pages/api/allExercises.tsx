import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const exercises = await prisma.workoutLine.groupBy({
        by: ["workoutId", "exerciseId"],
      });
      await prisma.$disconnect;
      return res.status(200).json(exercises);
    default:
      break;
  }
}

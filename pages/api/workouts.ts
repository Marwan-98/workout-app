import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const workouts = await prisma.workout.findMany();
      prisma.$disconnect;
      return res.status(200).json(workouts);
    default:
      break;
  }
}

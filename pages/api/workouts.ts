import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const workouts = await prisma.workout.findMany();
      prisma.$disconnect;
      return res.status(200).json(workouts);
    default:
      break;
  }
}

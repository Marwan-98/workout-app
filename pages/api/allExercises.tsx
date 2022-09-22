import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const exercises = await prisma.exercise.findMany();
      await prisma.$disconnect;
      console.log(exercises);
      return res.status(200).json(exercises);
    default:
      break;
  }
}

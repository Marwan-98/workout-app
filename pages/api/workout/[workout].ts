import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  switch (req.method) {
    case "GET":
      const workout = await prisma.workout.findUnique({
        where: {
          id: +req.headers.id!,
        },
        include: {
          exercises: true,
        },
      });
      prisma.$disconnect;
      return res.status(200).json(workout?.exercises);
      break;

    default:
      break;
  }
}

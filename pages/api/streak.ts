// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { differenceInHours } from "date-fns";
import { prisma } from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { id } = req.headers;
      const today = new Date();
      const findUser = await prisma.user.findFirst({
        where: {
          id: +id!,
        },
      });
      const lastUserLog = await prisma.userLog.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
      if (
        Math.ceil(differenceInHours(today, lastUserLog!.createdAt!) / 24) > 1
      ) {
        console.log("streak broken");
        await prisma.user.update({
          where: {
            id: 2,
          },
          data: {
            lastLog: today,
            streak: 0,
          },
        });
      }
      await prisma.$disconnect;
      return res.status(200).json(findUser);
    default:
      break;
  }
}

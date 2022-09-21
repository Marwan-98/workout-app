// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  isSameDay,
} from "date-fns";
import { prisma } from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { id } = req.headers;
      const today = new Date();
      let streak = 0;
      let isStreak = true;
      let idx = 0;

      const userLogs = await prisma.userLog.groupBy({
        by: ["createdAt"],
        where: {
          userId: +id!,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (isSameDay(today, userLogs[0].createdAt)) {
        streak++;
        while (isStreak && userLogs[idx + 1]) {
          const date = new Date(
            userLogs[idx + 1].createdAt.toDateString().split("T")[0]
          );
          if (
            !isSameDay(userLogs[idx].createdAt, date) &&
            differenceInHours(
              userLogs[idx].createdAt,
              userLogs[idx + 1].createdAt
            ) < 24
          ) {
            streak++;
            idx++;
          } else if (isSameDay(userLogs[idx].createdAt, date)) {
            idx++;
          } else {
            isStreak = false;
          }
        }
      }
      const findUser = await prisma.user.update({
        where: {
          id: +id!,
        },
        data: {
          streak,
        },
      });
      await prisma.$disconnect;
      return res.status(200).json(findUser);
    default:
      break;
  }
}

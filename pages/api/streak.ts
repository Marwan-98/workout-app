// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  formatISO,
  intlFormat,
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

      if (userLogs[0]) {
        if (
          differenceInHours(
            today,
            new Date(formatISO(userLogs[0]?.createdAt))
          ) < 24
        ) {
          streak++;
          while (isStreak && userLogs[idx + 1]) {
            const date = new Date(formatISO(userLogs[idx].createdAt));
            const nextDate = new Date(formatISO(userLogs[idx + 1].createdAt));
            if (
              !isSameDay(date, nextDate) &&
              differenceInHours(date, nextDate) < 24
            ) {
              streak++;
              idx++;
            } else if (isSameDay(date, nextDate)) {
              idx++;
            } else {
              isStreak = false;
            }
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

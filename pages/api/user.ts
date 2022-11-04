// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const main = async ({
    firstName,
    lastName,
    email,
    password,
    age,
    weight,
    height,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    weight: number;
    height: number;
  }) => {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        age: +age,
        weight: +weight,
        height: +height,
      },
    });
    return user;
  };
  switch (req.method) {
    case "POST":
      const { firstName, lastName, email, password, age, weight, height } =
        req.body;
      main({ firstName, lastName, email, password, age, weight, height })
        .then(async (user) => {
          await prisma.$disconnect();
          return res.status(200).json(user);
        })
        .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          return res.status(400).json({ message: e });
        });
      break;
    case "GET":
      const { mail } = req.headers;
      const findUser = await prisma.user.findUnique({
        where: {
          email: String(mail),
        },
      });
      return res.status(200).json(findUser);
      break;
    default:
      break;
  }
}

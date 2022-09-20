// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    console.log(user);
  };
  switch (req.method) {
    case "POST":
      const { firstName, lastName, email, password, age, weight, height } =
        req.body;
      main({ firstName, lastName, email, password, age, weight, height })
        .then(async () => {
          await prisma.$disconnect();
        })
        .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          process.exit(1);
        });
      break;
    default:
      break;
  }
}

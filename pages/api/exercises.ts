import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { id } = req.headers;
      const exercises = await prisma.userLog.findMany({
        where: {
          userId: +id!,
        },
        include: {
          exercise: true,
          workoutLine: true,
        },
      });
      await prisma.$disconnect;
      return res.status(200).json(exercises);
    default:
      break;
  }
}

// const exercises = await prisma.userLog.groupBy({
//   by: ["createdAt", "id", "reps", "weight", "exerciseId"],
//   where: {
//     userId: 2,
//   },
//   orderBy: {
//     id: "asc",
//   },
// });
// const exercisesNames: {
//   [key: string]: {
//     name: string;
//     createdAt: Date;
//     reps: number[];
//     weight: number[];
//   };
// } = {};
// for (let i = 0; i < exercises.length; i++) {
//   const findExercise = await prisma.exercise.findFirst({
//     where: {
//       id: exercises[i].exerciseId,
//     },
//     include: {
//       userLog: {
//         where: {
//           id: exercises[i].id,
//         },
//       },
//     },
//   });
//   if (!exercisesNames[`${findExercise!.userLog[0].createdAt}`]) {
//     exercisesNames[`${findExercise!.userLog[0].createdAt}`] = {
//       name: findExercise!.name,
//       createdAt: findExercise!.userLog[0].createdAt,
//       reps: [findExercise!.userLog[0].reps],
//       weight: [findExercise!.userLog[0].weight],
//     };
//   } else {
//     exercisesNames[`${findExercise!.userLog[0].createdAt}`] = {
//       ...exercisesNames[`${findExercise!.userLog[0].createdAt}`],
//       reps: [
//         ...exercisesNames[`${findExercise!.userLog[0].createdAt}`].reps,
//         findExercise!.userLog[0].reps,
//       ],
//       weight: [
//         ...exercisesNames[`${findExercise!.userLog[0].createdAt}`].weight,
//         findExercise!.userLog[0].weight,
//       ],
//     };
//   }
// }

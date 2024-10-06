"use server";

import { db } from "@/lib/prisma";

export const deleteMeal = async (mealId: string) => {
  await db.meal.delete({
    where: {
      id: mealId,
    },
  });
};

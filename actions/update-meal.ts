"use server";

import { db } from "@/lib/prisma";
import { Meal } from "@prisma/client";

export const updateMeal = async (
  params: Omit<Meal, "userId" | "updatedAt">
) => {
  await db.meal.update({
    where: {
      id: params.id,
    },
    data: {
      name: params.name,
      description: params.description,
      isWithinDiet: params.isWithinDiet,
      createdAt: params.createdAt,
    },
  });
};

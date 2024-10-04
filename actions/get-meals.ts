"use server";

import { db } from "@/lib/prisma";

export const getMeals = (userId?: string) => {
  if (!userId) return;

  return db.meal.findMany({
    where: {
      userId,
    },
  });
};

export const getMealsWithinDiet = (userId?: string) => {
  if (!userId) return;

  return db.meal.findMany({
    where: {
      isWithinDiet: true,
      userId,
    },
  });
};

export const getMealsOutsideDiet = (userId?: string) => {
  if (!userId) return;

  return db.meal.findMany({
    where: {
      isWithinDiet: false,
      userId,
    },
  });
};

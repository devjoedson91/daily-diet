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

export const mealById = (mealId: string) => {
  if (!mealId) return;

  return db.meal.findFirst({
    where: {
      id: mealId,
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

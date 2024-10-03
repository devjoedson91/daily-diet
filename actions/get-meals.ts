"use server";

import { db } from "@/lib/prisma";

export const getMeals = () => {
  return db.meal.findMany();
};

export const getMealsWithinDiet = () => {
  return db.meal.findMany({
    where: {
      isWithinDiet: true,
    },
  });
};

export const getMealsOutsideDiet = () => {
  return db.meal.findMany({
    where: {
      isWithinDiet: false,
    },
  });
};

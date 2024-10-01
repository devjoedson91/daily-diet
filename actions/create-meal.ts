"use server";

import { db } from "@/lib/prisma";

interface CreateMealParams {
  name: string;
  description: string;
  createdAt: Date;
  isWithinDiet: boolean;
  userId: string;
}

export const createMeal = async (params: CreateMealParams) => {
  await db.meal.create({
    data: params,
  });
};

"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export interface CreateMealParams {
  name: string;
  description: string;
  createdAt: string;
  isWithinDiet: boolean;
}

export const createMeal = async (params: CreateMealParams) => {
  const user = await getServerSession(authOptions);

  if (!user) {
    throw new Error("Usuário não identificado");
  }

  await db.meal.create({
    data: { ...params, userId: (user.user as any).id },
  });
};

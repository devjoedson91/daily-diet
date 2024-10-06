"use client";

import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import MealForm from "@/components/meal-form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { mealById } from "@/actions/get-meals";
import { Meal } from "@prisma/client";
import Loading from "@/components/loading";

export default function Create() {
  const searchParams = useSearchParams();

  const mealId = searchParams.get("mealId");

  const [meal, setMeal] = useState<Meal>();

  useEffect(() => {
    const getMeal = async () => {
      const response = await mealById(mealId as string);

      setMeal(response as Meal);
    };

    mealId && getMeal();
  }, [mealId]);

  if (!meal) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-5">
      <Header title="Editar refeição" />
      <Card className="py-6 bg-white rounded-t-3xl">
        <CardContent className="w-full">
          <MealForm method="put" meal={meal} />
        </CardContent>
      </Card>
    </div>
  );
}

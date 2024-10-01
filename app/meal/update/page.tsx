"use client";

import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { useRouter } from "next/navigation";
import MealForm, { MealProps, formSchema } from "@/components/meal-form";

export default function Create() {
  const router = useRouter();

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/create/feedback?isWithinDiet=${data.isWithinDiet}`);
  }

  const mealData: MealProps = {
    name: "Sanduiche",
    description:
      "Sanduíche de pão integral com atum e salada de alface e tomate",
    date: "12/08/2022",
    hour: "12:00",
    isWithinDiet: false,
  };

  return (
    <div className="flex flex-col bg-gray-5">
      <Header title="Editar refeição" />
      <Card className="py-6 bg-white rounded-t-3xl">
        <CardContent className="w-full">
          <MealForm
            handleSubmit={handleSubmit}
            method="put"
            mealData={mealData}
          />
        </CardContent>
      </Card>
    </div>
  );
}

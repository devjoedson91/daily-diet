import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../components/dash-header";
import StatisticCard from "../components/statistic-card";
import {
  getMeals,
  getMealsOutsideDiet,
  getMealsWithinDiet,
} from "@/actions/get-meals";
import { twMerge } from "tailwind-merge";

export default async function Dashboard() {
  const meals = await getMeals();

  const mealsWithinDiet = await getMealsWithinDiet();

  const mealOutsideDiet = await getMealsOutsideDiet();

  const perc: number = (mealsWithinDiet.length / meals.length) * 100;

  return (
    <div
      className={twMerge(
        "flex flex-col h-screen w-full",
        perc > 50 ? "bg-green-light" : "bg-red-light"
      )}
    >
      <Header perc={perc} />
      <Card className="flex flex-1 py-6 bg-white rounded-t-3xl">
        <CardContent className="w-full flex flex-col gap-5">
          <h1 className="text-center text-base font-bold">
            Estatísticas gerais
          </h1>

          <div className="grid grid-cols-1 grid-rows-3 gap-4 h-3/4">
            <StatisticCard
              className="bg-gray-6"
              cardValue={22}
              description="melhor sequência de pratos dentro da dieta"
            />
            <StatisticCard
              className="bg-gray-6"
              cardValue={meals.length}
              description="refeições registradas"
            />
            <div className="grid grid-cols-2 grid-rows-1 gap-4 h-full">
              <StatisticCard
                className="bg-green-light"
                cardValue={mealsWithinDiet.length}
                description="refeições dentro da dieta"
              />
              <StatisticCard
                className="bg-red-light"
                cardValue={mealOutsideDiet.length}
                description="refeições fora da dieta"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

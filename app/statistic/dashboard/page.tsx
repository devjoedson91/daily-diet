"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../components/dash-header";
import StatisticCard from "../components/statistic-card";
import {
  getMeals,
  getMealsOutsideDiet,
  getMealsWithinDiet,
} from "@/actions/get-meals";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Meal } from "@prisma/client";

export default function Dashboard() {
  const { data: session } = useSession();

  const [mealsWithinDiet, setMealsWithinDiet] = useState<Meal[]>([]);

  const [mealsOutsideDiet, setMealsOutsideDiet] = useState<Meal[]>([]);

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    async function fetch() {
      try {
        const allMeals = await getMeals(session?.user?.id);

        const withinDiet = await getMealsWithinDiet(session?.user?.id);

        const outSideDiet = await getMealsOutsideDiet(session?.user?.id);

        setMeals(allMeals as Meal[]);

        setMealsOutsideDiet(outSideDiet as Meal[]);

        setMealsWithinDiet(withinDiet as Meal[]);
      } catch (error: any) {
        toast.error("Falha ao buscar refeições no banco de dados");
      }
    }
    session?.user?.id && fetch();
  }, [session?.user]);

  const perc = useMemo((): number => {
    return (mealsWithinDiet.length / meals.length) * 100;
  }, [mealsWithinDiet]);

  return (
    <div
      className={twMerge(
        "flex flex-col h-screen w-full",
        Number.isFinite(perc) && perc > 50 ? "bg-green-light" : "bg-red-light"
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
                cardValue={mealsOutsideDiet.length}
                description="refeições fora da dieta"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

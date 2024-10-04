"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/home-header";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";
import { getMeals, getMealsWithinDiet } from "@/actions/get-meals";
import { Meal } from "@prisma/client";
import ButtonNewMeal from "./components/button-new-meal";
import ButtonPercent from "./components/button-percent";
import MealCard from "./components/meal-card";
import { toast } from "sonner";

export default function Statistic() {
  const { status, data: session } = useSession();

  const [mealsWithinDiet, setMealsWithinDiet] = useState<Meal[]>([]);

  const [meals, setMeals] = useState<Meal[]>([]);

  const perc = useMemo((): number => {
    return (mealsWithinDiet.length / meals.length) * 100;
  }, [mealsWithinDiet]);

  const uniqueDatesMeals = useMemo((): string[] => {
    return meals
      .filter((item, index, self) => {
        return (
          index ===
          self.findIndex(
            (o) =>
              new Date(o.createdAt).toDateString() ===
              new Date(item.createdAt).toDateString()
          )
        );
      })
      .map((item) =>
        new Date(item.createdAt).toLocaleDateString().replace(/\//g, ".")
      );
  }, [meals]);

  const listMealsByDate = useCallback(
    (date: string): Meal[] => {
      const formatDate = date.split(".").reverse().join(".");

      return meals.filter(
        (meal) =>
          new Date(meal.createdAt).toDateString() ===
          new Date(formatDate).toDateString()
      );
    },
    [uniqueDatesMeals]
  );

  useEffect(() => {
    async function fetch() {
      try {
        const allMeals = await getMeals(session?.user?.id);

        const withinDiet = await getMealsWithinDiet(session?.user?.id);

        setMeals(allMeals as Meal[]);

        setMealsWithinDiet(withinDiet as Meal[]);
      } catch (error: any) {
        toast.error("Falha ao buscar refeições no banco de dados");
      }
    }
    session?.user?.id && fetch();
  }, [session?.user]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col p-5 gap-8">
      <Header />

      <ButtonPercent perc={perc} />

      <ButtonNewMeal />

      <div className="flex flex-col gap-5">
        {uniqueDatesMeals.map((item) => (
          <div key={item} className="flex flex-col">
            <h1 className="text-gray-1 font-bold text-lg mb-2">{item}</h1>
            <div className="flex flex-col gap-2">
              {listMealsByDate(item).map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed left-0 bottom-0 bg-gradient-to-t from-white via-white via-30% to-transparent w-full h-12"></div>
    </div>
  );
}

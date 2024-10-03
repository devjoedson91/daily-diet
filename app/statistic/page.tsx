"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./components/home-header";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";
import { getMeals } from "@/actions/get-meals";
import { Meal } from "@prisma/client";
import { twMerge } from "tailwind-merge";

export default function Statistic() {
  const router = useRouter();

  const { status } = useSession();

  const [dayMeals, setDayMeals] = useState<Meal[]>([]);

  function handleDashNavigation() {
    router.push("/statistic/dashboard");
  }

  function handleMealNavigation() {
    router.push("/create");
  }

  const mealsWithinDiet = useMemo((): number => {
    const amountMealsWithinDiet = dayMeals.filter(
      (meal) => meal.isWithinDiet === true
    ).length;

    return (amountMealsWithinDiet / dayMeals.length) * 100;
  }, [dayMeals]);

  useEffect(() => {
    const fetch = async () => {
      const meals = await getMeals();

      setDayMeals(meals);
    };
    fetch();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-5 gap-8">
      <Header />
      <Button
        variant="outline"
        className={twMerge(
          "relative h-24 flex flex-col items-center justify-center gap-2",
          mealsWithinDiet > 50 ? "bg-green-light" : "bg-red-light"
        )}
        onClick={handleDashNavigation}
      >
        {Number.isFinite(mealsWithinDiet) ? (
          <h1 className="font-bold text-[32px]">
            {mealsWithinDiet.toFixed(2)}%
          </h1>
        ) : (
          <h1 className="text-base font-bold">Carregando...</h1>
        )}
        <p className="text-base">das refeições dentro da dieta</p>
        <ArrowUpRight
          size={24}
          className={twMerge(
            "absolute top-2 right-2",
            mealsWithinDiet > 50 ? "text-green-dark" : "text-red-dark"
          )}
        />
      </Button>
      <div className="flex flex-col gap-2">
        <Label className="text-base text-gray-1 font-bold">Refeições</Label>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 bg-gray-2 hover:bg-gray-2/70 w-full h-12 text-white"
          onClick={handleMealNavigation}
        >
          <Plus size={18} />
          <h2>Nova refeição</h2>
        </Button>
      </div>
    </div>
  );
}

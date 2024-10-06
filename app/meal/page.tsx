"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheck, CircleX, PencilLine, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { mealById } from "@/actions/get-meals";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { deleteMeal } from "@/actions/delete-meal";
import { toast } from "sonner";
import { type Meal } from "@prisma/client";

export default function Meal() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const mealId = searchParams.get("mealId");

  const [meal, setMeal] = useState<Meal>();

  useEffect(() => {
    const fetch = async () => {
      const response = await mealById(mealId as string);

      setMeal(response as Meal);
    };

    mealId && fetch();
  }, [mealId]);

  function handleNavigation() {
    if (!meal?.id) return;

    router.push(`/meal/update?mealId=${meal.id}`);
  }

  async function handleDeleteMeal() {
    if (!meal?.id) return;

    try {
      await deleteMeal(meal.id);

      toast.success("Refeição removida com sucesso!");

      router.push("/statistic");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover refeição. Tente novamente.");
    }
  }

  return (
    <div
      className={twMerge(
        "flex flex-col h-screen",
        meal?.isWithinDiet ? "bg-green-light" : "bg-red-light"
      )}
    >
      <Header title="Refeição" />
      <Card className="py-6 bg-white flex-1 rounded-t-3xl">
        <CardContent className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-bold">{meal?.name}</h1>
              <p className="text-base">{meal?.description}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Data e hora</h1>
              <p className="text-base">
                {meal && (
                  <>
                    {format(new Date(meal.createdAt), "dd/MM/yyyy")}
                    &nbsp;ás&nbsp;{format(new Date(meal.createdAt), "HH:mm")}
                  </>
                )}
              </p>
            </div>
            {meal && (
              <Badge
                variant="outline"
                className="w-36 h-9 border-none bg-gray-6 flex items-center gap-2"
              >
                {meal.isWithinDiet ? (
                  <>
                    <CircleCheck size={16} className="text-green-dark" />
                    <h2 className="text-sm text-gray-1">Dentro da dieta</h2>
                  </>
                ) : (
                  <>
                    <CircleX size={16} className="text-red-dark" />
                    <h2 className="text-sm text-gray-1">Fora da dieta</h2>
                  </>
                )}
              </Badge>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              className="flex items-center bg-gray-2 w-full h-12 gap-2 text-white"
              variant="outline"
              onClick={handleNavigation}
            >
              <PencilLine size={18} />
              <h2 className="font-bold text-sm">Editar refeição</h2>
            </Button>
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center justify-center text-gray-2 border w-full h-12 rounded-md gap-2">
                  <Trash2 size={18} />
                  <h2 className="font-bold text-sm">Excluir refeição</h2>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white border-none text-gray-2">
                <h1 className="text-center text-lg font-bold">
                  Deseja realmente excluir o registro da refeição?
                </h1>
                <div className="w-full grid grid-cols-2 grid-rows-1 h-12 gap-4">
                  <DialogClose className="rounded-md border text-sm font-bold">
                    Cancelar
                  </DialogClose>
                  <Button
                    variant="outline"
                    className="bg-gray-2 hover:bg-gray-2/70 h-full text-white text-sm font-bold"
                    onClick={handleDeleteMeal}
                  >
                    Sim, excluir
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

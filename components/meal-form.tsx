"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import ButtonSelect from "./button-select";
import { CircleCheck, CircleX } from "lucide-react";
import { Button } from "./ui/button";
import { formatToDate, formatToTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CreateMealParams, createMeal } from "@/actions/create-meal";
import { toast } from "sonner";
import { Meal } from "@prisma/client";
import { format } from "date-fns";
import { updateMeal } from "@/actions/update-meal";

export const formSchema = z.object({
  name: z.string({ message: "Informe o nome da refeição" }),
  description: z
    .string({ message: "Descreva brevemente a refeição" })
    .min(1, { message: "Descreva brevemente a refeição" }),
  date: z
    .string({ message: "Informe a data da refeição" })
    .min(1, { message: "Informe a data da refeição" })
    .max(10, { message: "Data inválida" })
    .regex(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/, {
      message:
        "Formato inválido. Use o formato DD/MM/AAAA com dias, meses e anos válidos",
    }),
  hour: z
    .string({ message: "Informe a hora da refeição" })
    .min(1, { message: "Informe a hora da refeição" })
    .max(5, { message: "Hora inválida" })
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
      message:
        "Formato inválido. Use o formato HH:MM com horas de 00 a 23 e minutos de 00 a 59",
    }),
  isWithinDiet: z.boolean({
    message: "Selecione se a refeição está dentro da dieta",
  }),
});

interface MealFormProps {
  meal?: Meal;
  method: "post" | "put";
}

export default function MealForm({ method, meal }: MealFormProps) {
  const router = useRouter();

  const defaultValues =
    method === "put" && meal
      ? {
          name: meal.name,
          description: meal.description,
          date: format(new Date(meal.createdAt), "dd/MM/yyyy"),
          hour: format(new Date(meal.createdAt), "HH:mm"),
        }
      : {
          hour: "",
          date: "",
        };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isWithinDiet, setIsWithinDiet] = useState(
    method === "put" && meal ? meal.isWithinDiet : true
  );

  const { setValue, watch } = form;

  const hour = watch("hour");
  const date = watch("date");

  useEffect(() => {
    setValue("isWithinDiet", isWithinDiet);
  }, [isWithinDiet]);

  useEffect(() => {
    setValue("hour", formatToTime(hour));
  }, [hour]);

  useEffect(() => {
    setValue("date", formatToDate(date));
  }, [date]);

  function handleSelected() {
    setIsWithinDiet(!isWithinDiet);
  }

  async function handleCreateMeal(data: z.infer<typeof formSchema>) {
    try {
      const formatDateString = data.date.split("/").reverse().join("-");

      const localDate = new Date(`${formatDateString}T${data.hour}`);

      const adjustDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      );

      const params = {
        name: data.name,
        description: data.description,
        createdAt: adjustDate.toISOString().replace(/z/i, ""),
        isWithinDiet: data.isWithinDiet,
      } satisfies CreateMealParams;

      await createMeal(params);

      toast.success("Refeição criada com sucesso!");

      router.push(`/create/feedback?isWithinDiet=${data.isWithinDiet}`);
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
    }
  }

  async function handleUpdateMeal(data: z.infer<typeof formSchema>) {
    if (!meal) return;

    try {
      const formatDateString = data.date.split("/").reverse().join("-");

      const localDate = new Date(`${formatDateString}T${data.hour}`);

      const adjustDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      );

      const params = {
        id: meal.id,
        name: data.name,
        description: data.description,
        createdAt: adjustDate.toISOString().replace(/z/i, ""),
        isWithinDiet: data.isWithinDiet,
      } satisfies Omit<Meal, "userId" | "updatedAt">;

      await updateMeal(params);

      toast.success("Refeição editada com sucesso!");

      router.push(`/create/feedback?isWithinDiet=${data.isWithinDiet}`);
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          method === "post" ? handleCreateMeal : handleUpdateMeal
        )}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 grid-rows-1 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Data</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Hora</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isWithinDiet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">
                Está dentro da dieta?
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 grid-rows-1 gap-4">
                  <ButtonSelect
                    action={handleSelected}
                    className={isWithinDiet ? "border-2 border-green-dark" : ""}
                  >
                    <CircleCheck size={16} className="text-green-dark" />
                    <h2>Sim</h2>
                  </ButtonSelect>
                  <ButtonSelect
                    action={handleSelected}
                    className={!isWithinDiet ? "border-2 border-red-dark" : ""}
                  >
                    <CircleX size={16} className="text-red-dark" />
                    <h2>Não</h2>
                  </ButtonSelect>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          className="flex mt-2 text-base items-center justify-center gap-2 bg-gray-2 hover:bg-gray-2/70 w-full h-12 text-white"
          type="submit"
        >
          {method === "post" ? "Cadastrar refeição" : "Salvar alterações"}
        </Button>
      </form>
    </Form>
  );
}

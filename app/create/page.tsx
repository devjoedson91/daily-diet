"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonSelect from "./components/ButtonSelect";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatToDate, formatToTime } from "@/lib/utils";

const formSchema = z.object({
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

export default function Create() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hour: "",
      date: "",
    },
  });

  const { setValue, watch } = form;

  const [isWithinDiet, setIsWithinDiet] = useState(true);

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

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/create-meal/done?isWithinDiet=${data.isWithinDiet}`);
  }

  function handleSelected() {
    setIsWithinDiet(!isWithinDiet);
  }

  return (
    <div className="flex flex-col bg-gray-5">
      <Header title="Nova refeição" />
      <Card className="py-6 bg-white rounded-t-3xl">
        <CardContent className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
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
                    <FormLabel className="text-sm font-bold">
                      Descrição
                    </FormLabel>
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
                          className={
                            isWithinDiet ? "border-2 border-green-dark" : ""
                          }
                        >
                          <CircleCheck size={16} className="text-green-dark" />
                          <h2>Sim</h2>
                        </ButtonSelect>
                        <ButtonSelect
                          action={handleSelected}
                          className={
                            !isWithinDiet ? "border-2 border-red-dark" : ""
                          }
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
                className="flex mt-2 items-center justify-center gap-2 bg-gray-2 hover:bg-gray-2/70 w-full h-12 text-white"
                type="submit"
              >
                <h2>Cadastrar refeição</h2>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

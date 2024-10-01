"use client";

import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { useRouter } from "next/navigation";
import MealForm, { formSchema } from "@/components/meal-form";

export default function Create() {
  const router = useRouter();

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/create/feedback?isWithinDiet=${data.isWithinDiet}`);
  }

  return (
    <div className="flex flex-col bg-gray-5">
      <Header title="Nova refeição" />
      <Card className="py-6 bg-white rounded-t-3xl">
        <CardContent className="w-full">
          <MealForm handleSubmit={handleSubmit} method="post" />
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./components/home-header";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";

export default function Statistic() {
  const router = useRouter();

  const { status } = useSession();

  function handleDashNavigation() {
    router.push("/statistic/dashboard");
  }

  function handleMealNavigation() {
    router.push("/create");
  }

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
        className="bg-green-light relative h-24 flex flex-col items-center justify-center gap-2"
        onClick={handleDashNavigation}
      >
        <h1 className="font-bold text-[32px]">90,86%</h1>
        <p className="text-base">das refeições dentro da dieta</p>
        <ArrowUpRight
          size={24}
          className="absolute top-2 right-2 text-green-dark"
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

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonPercentProps {
  perc: number;
}

export default function ButtonPercent({ perc }: ButtonPercentProps) {
  const router = useRouter();

  function handleDashNavigation() {
    router.push("/statistic/dashboard");
  }

  return (
    <Button
      variant="outline"
      className={twMerge(
        "relative h-24 flex flex-col items-center justify-center gap-2",
        Number.isFinite(perc) && perc > 50 ? "bg-green-light" : "bg-red-light"
      )}
      onClick={handleDashNavigation}
    >
      {Number.isFinite(perc) ? (
        <h1 className="font-bold text-[32px]">{perc.toFixed(2)}%</h1>
      ) : (
        <h1 className="text-base font-bold">Carregando...</h1>
      )}
      <p className="text-base">das refeições dentro da dieta</p>
      <ArrowUpRight
        size={24}
        className={twMerge(
          "absolute top-2 right-2",
          perc > 50 ? "text-green-dark" : "text-red-dark"
        )}
      />
    </Button>
  );
}

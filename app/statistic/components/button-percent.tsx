import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ButtonPercentProps {
  perc: number;
}

export default function ButtonPercent({ perc }: ButtonPercentProps) {
  const router = useRouter();

  const [percCounter, setPercCounter] = useState(0);

  function handleDashNavigation() {
    router.push("/statistic/dashboard");
  }

  useEffect(() => {
    if (Number.isFinite(perc)) {
      const interval = setInterval(() => {
        setPercCounter((prevCounter) => {
          if (prevCounter < perc) {
            return Math.min(prevCounter + 0.1, 100);
          } else {
            clearInterval(interval);

            return prevCounter;
          }
        });
      }, 5);

      return () => clearInterval(interval);
    }
  }, [perc]);

  return (
    <Button
      variant="outline"
      className={twMerge(
        "relative h-24 flex flex-col items-center justify-center gap-2 transition duration-1000",
        Number(percCounter.toFixed(2)) > 50 ? "bg-green-light" : "bg-red-light"
      )}
      onClick={handleDashNavigation}
    >
      <h1 className="font-bold text-[32px]">
        {percCounter < 100 ? `${percCounter.toFixed(2)}%` : `${percCounter}%`}
      </h1>

      <p className="text-base">das refeições dentro da dieta</p>
      <ArrowUpRight
        size={24}
        className={twMerge(
          "absolute top-2 right-2",
          Number(percCounter.toFixed(2)) > 50
            ? "text-green-dark"
            : "text-red-dark"
        )}
      />
    </Button>
  );
}

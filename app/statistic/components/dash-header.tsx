"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface DashHeaderProps {
  perc: number;
}

export default function DashHeader({ perc }: DashHeaderProps) {
  const [percCounter, setPercCounter] = useState(0);

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
    <div className="flex flex-col h-36 justify-center items-center relative">
      <div className="absolute top-5 left-5">
        <Link href="/statistic">
          <ChevronLeft
            size={24}
            className={perc > 50 ? "text-green-dark" : "text-red-dark"}
          />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-[32px]">{percCounter.toFixed(2)}%</h1>
        <p className="text-base">das refeições dentro da dieta</p>
      </div>
    </div>
  );
}

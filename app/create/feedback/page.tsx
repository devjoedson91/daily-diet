"use client";

import Image from "next/image";
import Illustration1 from "@/assets/illustration1.svg";
import Illustration2 from "@/assets/illustration2.svg";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function Feedback() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const isWithinDiet = JSON.parse(
    searchParams.get("isWithinDiet") as string
  ) as boolean;

  function handleNavigation() {
    router.push("/statistic");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      {isWithinDiet ? (
        <div>
          <h1 className="text-green-dark font-bold text-2xl mb-2 text-center">
            Continue assim!
          </h1>
          <p className="text-gray-1 text-base">
            Você continua <strong>dentro da dieta</strong>. Muito bem!
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-red-dark font-bold text-2xl mb-2 text-center">
            Que pena!
          </h1>
          <p className="text-gray-1 text-base text-center">
            Você <strong>saiu da dieta</strong> dessa vez, mas continue se
            esforçando e não desista!
          </p>
        </div>
      )}

      <div className="relative w-56 h-72">
        <Image
          src={isWithinDiet ? Illustration1 : Illustration2}
          alt="illustration"
          fill
        />
      </div>

      <Button
        variant="outline"
        className="bg-gray-2 h-12 text-white hover:bg-gray-2/70"
        onClick={handleNavigation}
      >
        Ir para página inicial
      </Button>
    </div>
  );
}

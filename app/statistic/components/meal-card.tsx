import { Button } from "@/components/ui/button";
import { Meal } from "@prisma/client";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  const router = useRouter();

  const hour = new Date(meal.createdAt).toLocaleTimeString();

  function handleNavigation() {
    router.push("/meal");
  }

  return (
    <Button
      className="border w-full h-12 flex hover:bg-gray-6 items-center justify-between text-gray-1"
      onClick={handleNavigation}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold text-xs">{hour}</span>
        <span>|</span>
        <h1 className="text-base">{meal.name}</h1>
      </div>
      {meal.isWithinDiet ? (
        <CircleCheck strokeWidth={4} className="text-green-mid" size={14} />
      ) : (
        <CircleX strokeWidth={4} className="text-red-mid" size={14} />
      )}
    </Button>
  );
}

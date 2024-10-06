import { Button } from "@/components/ui/button";
import { Meal } from "@prisma/client";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  const router = useRouter();

  function handleNavigation() {
    router.push(`/meal?mealId=${meal.id}`);
  }

  return (
    <Button
      className="border w-full h-12 flex hover:bg-gray-6/50 items-center justify-between text-gray-1"
      onClick={handleNavigation}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold text-xs">
          {format(new Date(meal.createdAt), "HH:mm")}
        </span>
        <span>|</span>
        <h1 className="text-base">{meal.name}</h1>
      </div>
      {meal.isWithinDiet ? (
        <CircleCheck strokeWidth={3} className="text-green-mid" size={16} />
      ) : (
        <CircleX strokeWidth={3} className="text-red-mid" size={16} />
      )}
    </Button>
  );
}

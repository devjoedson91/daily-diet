import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import MealForm from "@/components/meal-form";

export default function Create() {
  return (
    <div className="flex flex-col bg-gray-5">
      <Header title="Nova refeição" />
      <Card className="py-6 bg-white rounded-t-3xl">
        <CardContent className="w-full">
          <MealForm method="post" />
        </CardContent>
      </Card>
    </div>
  );
}

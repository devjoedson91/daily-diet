import { Card, CardContent } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";

interface CardProps {
  className: string;
  description: string;
  cardValue: string;
}

export default function StatisticCard({
  className,
  description,
  cardValue,
}: CardProps) {
  return (
    <Card className={twMerge("rounded-lg", className)}>
      <CardContent className="flex flex-col items-center justify-center py-2 h-full">
        <h1 className="text-2xl font-bold">{cardValue}</h1>
        <p className="text-sm text-center">{description}</p>
      </CardContent>
    </Card>
  );
}

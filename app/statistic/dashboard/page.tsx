import { Card, CardContent } from "@/components/ui/card";
import Header from "../components/dash-header";
import StatisticCard from "../components/statistic-card";

export default function Dashboard() {
  return (
    <div className="bg-green-light flex flex-col h-screen w-full">
      <Header />
      <Card className="flex flex-1 py-6 bg-white rounded-t-3xl">
        <CardContent className="w-full flex flex-col gap-5">
          <h1 className="text-center text-base font-bold">
            Estatísticas gerais
          </h1>

          <div className="grid grid-cols-1 grid-rows-3 gap-4 h-3/4">
            <StatisticCard
              className="bg-gray-6"
              cardValue="22"
              description="melhor sequência de pratos dentro da dieta"
            />
            <StatisticCard
              className="bg-gray-6"
              cardValue="109"
              description="refeições registradas"
            />
            <div className="grid grid-cols-2 grid-rows-1 gap-4 h-full">
              <StatisticCard
                className="bg-green-light"
                cardValue="99"
                description="refeições dentro da dieta"
              />
              <StatisticCard
                className="bg-red-light"
                cardValue="10"
                description="refeições fora da dieta"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

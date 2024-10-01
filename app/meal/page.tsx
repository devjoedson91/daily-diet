import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, PencilLine, Trash2 } from "lucide-react";

export default function Meal() {
  return (
    <div className="flex flex-col bg-green-light h-screen">
      <Header title="Refeição" />
      <Card className="py-6 bg-white flex-1 rounded-t-3xl">
        <CardContent className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-bold">Sanduiche</h1>
              <p className="text-base">
                Sanduíche de pão integral com atum e salada de alface e tomate
              </p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Data e hora</h1>
              <p className="text-base">12/08/2022 às 16:00</p>
            </div>
            <Badge
              variant="outline"
              className="w-36 h-9 border-none bg-gray-6 flex items-center gap-2"
            >
              <CircleCheck size={16} className="text-green-dark" />
              <h2 className="text-sm text-gray-1">Dentro da dieta</h2>
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              className="flex items-center bg-gray-2 w-full gap-2 text-white"
              variant="outline"
            >
              <PencilLine size={18} />
              <h2 className="font-bold text-sm">Editar refeição</h2>
            </Button>
            <Button
              className="flex items-center text-gray-2 border w-full gap-2"
              variant="outline"
            >
              <Trash2 size={18} />
              <h2 className="font-bold text-sm">Excluir refeição</h2>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

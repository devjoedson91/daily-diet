import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
              className="flex items-center bg-gray-2 w-full h-12 gap-2 text-white"
              variant="outline"
            >
              <PencilLine size={18} />
              <h2 className="font-bold text-sm">Editar refeição</h2>
            </Button>
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center justify-center text-gray-2 border w-full h-12 rounded-md gap-2">
                  <Trash2 size={18} />
                  <h2 className="font-bold text-sm">Excluir refeição</h2>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white border-none text-gray-2">
                <h1 className="text-center text-lg font-bold">
                  Deseja realmente excluir o registro da refeição?
                </h1>
                <div className="w-full grid grid-cols-2 grid-rows-1 h-12 gap-4">
                  <DialogClose className="rounded-md border text-sm font-bold">
                    Cancelar
                  </DialogClose>
                  <Button
                    variant="outline"
                    className="bg-gray-2 hover:bg-gray-2/70 h-full text-white text-sm font-bold"
                  >
                    Sim, excluir
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

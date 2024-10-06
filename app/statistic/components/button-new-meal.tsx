import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonNewMeal() {
  const router = useRouter();

  const { status } = useSession();

  function handleMealNavigation() {
    router.push("/create");
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base text-gray-1 font-bold">Refeições</Label>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 bg-gray-2 hover:bg-gray-2/70 w-full h-12 text-white"
        onClick={handleMealNavigation}
        disabled={status === "unauthenticated" || status === "loading"}
      >
        <Plus size={18} />
        <h2>Nova refeição</h2>
      </Button>
    </div>
  );
}

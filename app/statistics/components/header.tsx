import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col h-36 justify-center items-center relative">
      <div className="absolute top-5 left-5">
        <Link href="#">
          <ChevronLeft size={24} />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-[32px]">90,86%</h1>
        <p className="text-base">das refeições dentro da dieta</p>
      </div>
    </div>
  );
}

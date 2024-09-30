"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex h-20 justify-center items-center relative">
      <div className="absolute top-7 left-5">
        <Link href="/statistic">
          <ChevronLeft size={24} />
        </Link>
      </div>
      <h1 className="font-bold text-lg">{title}</h1>
    </div>
  );
}

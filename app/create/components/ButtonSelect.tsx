import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonSelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action(): void;
  children: ReactNode;
  className: string;
}

export default function ButtonSelect({
  className,
  action,
  children,
  ...props
}: ButtonSelectProps) {
  return (
    <Button
      onClick={action}
      variant="outline"
      type="button"
      className={twMerge(
        "bg-gray-6 h-12 font-bold text-sm flex items-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

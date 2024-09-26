import Image from "next/image";
import { Card } from "./ui/card";
import Logo from "@/assets/logo.svg";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <Card className="flex items-center justify-between bg-transparent border-none shadow-none">
      <div className="w-24 h-10 relative">
        <Image src={Logo} alt="Logo" fill />
      </div>
      <Avatar className="w-11 h-11 border-2 border-gray-1">
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
    </Card>
  );
}

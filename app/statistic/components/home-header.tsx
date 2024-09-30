import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function HomeHeader() {
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

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useSession, signOut } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function HomeHeader() {
  const { data: session } = useSession();

  function handleLogout() {
    signOut();
  }

  return (
    <Card className="flex items-center justify-between bg-transparent border-none shadow-none">
      <div className="w-24 h-10 relative">
        <Image src={Logo} alt="Logo" fill />
      </div>
      {session?.user?.image ? (
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-11 h-11 border-2 border-gray-1">
              <AvatarImage src={session.user.image} />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="bg-white mr-2 h-14 border-none">
            <Button
              className="flex items-center gap-2 w-full h-full"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <h1 className="text-lg font-bold">Sair</h1>
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Avatar className="w-11 h-11 border-2 border-gray-1">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      )}
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleLogo from "@/assets/google.png";
import Logo from "@/assets/logo.svg";

export default function Home() {
  function handleLoginWithGoogleClick() {
    signIn("google", { callbackUrl: "/statistic" });
  }

  return (
    <div className="flex flex-col items-center gap-5 justify-center h-screen">
      <div className="relative w-48 h-48">
        <Image alt="Logo" src={Logo} fill />
      </div>

      <Dialog>
        <DialogHeader>
          <DialogTitle className="text-center text-green-dark font-bold text-xl">
            Faça login na plataforma
          </DialogTitle>
          <DialogDescription>
            Conecte-se usando sua conta do Google.
          </DialogDescription>
        </DialogHeader>
      </Dialog>

      <Button
        variant="outline"
        className="gap-1 font-bold bg-gray-2 hover:bg-gray-2/70 text-white "
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src={GoogleLogo}
          width={24}
          height={24}
        />
        Google
      </Button>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleLogo from "@/assets/google.png";
import Logo from "@/assets/logo.svg";

export default function Home() {
  function handleLoginWithGoogleClick() {
    signIn("google", { callbackUrl: "/statistic" });
  }

  return (
    <div className="flex flex-col items-center gap-8 justify-center h-screen">
      <div className="relative w-52 h-48">
        <Image alt="Logo" src={Logo} fill />
      </div>

      <div>
        <h1 className="text-center text-green-dark font-bold text-xl">
          Faça login na plataforma
        </h1>
        <p>Conecte-se usando sua conta do Google.</p>
      </div>

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

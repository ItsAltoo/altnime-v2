"use client"
import { LoginForm } from "@/components/auth/login-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const AuthView = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/bg_login.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          priority
          unoptimized={true}
        />
      </div>
    </div>
  );
};

export default AuthView;

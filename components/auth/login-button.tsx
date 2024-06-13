"use client";
import React from "react";
import { useRouter } from "next/navigation";


interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
    const router= useRouter()
  const onClick = () => {
    router.push('/auth/login')
  };
  if (mode == "modal") {
    return <div>Implement modal</div>;
  }
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default LoginButton;

"use client";
import React from "react";
//NOTE: signIn() and SignOut() of @auth only work in server action, server component
import { signIn } from "next-auth/react";
import { signIn as signInAuth } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_DEIRECT } from "@/routes";
const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      //Redirect user to setting page (or any in future)
      callbackUrl: DEFAULT_LOGIN_DEIRECT
    })
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5"></FcGoogle>
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5"></FaGithub>
      </Button>
    </div>
  );
};

export default Social;

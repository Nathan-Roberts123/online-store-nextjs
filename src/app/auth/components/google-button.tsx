"use client";
import React from "react";
import GoogleIcon from "@/components/icons/google";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/store",
        })
      }
      className="flex w-full mt-6 items-center justify-center space-x-3 border border-gray6 py-3 px-4 rounded-md hover:border-black"
    >
      <GoogleIcon />
      <span>Continue with google</span>
    </button>
  );
};

export default GoogleButton;

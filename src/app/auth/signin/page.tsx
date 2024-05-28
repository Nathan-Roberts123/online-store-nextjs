"use client";
import Input from "@/components/ui/input";
import Wrapper from "../components/wrapper";
import FieldLabel from "@/components/forms/field-label";
import FormControl from "@/components/forms/form-control";
import { useForm } from "react-hook-form";
import { TSigninFormState, ZSigninFormState } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const Signin = () => {
  const { register, handleSubmit } = useForm<TSigninFormState>({
    resolver: zodResolver(ZSigninFormState),
  });
  const [logingIn, setLogingIn] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (data: TSigninFormState) => {
    setLogingIn(true);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!res) {
      throw new Error("there was no signin response");
    }

    if (res.ok) {
      router.push("/");
      return;
    }

    toast({
      type: "open",
      message: "Can not log a user with these credentials",
      variant: "error",
    });
    setLogingIn(false);
  };

  return (
    <Wrapper type="signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FieldLabel>Email</FieldLabel>
          <Input placeholder="Enter Your Email" {...register("email")} />
        </FormControl>

        <FormControl>
          <FieldLabel>Password</FieldLabel>
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
        </FormControl>

        <div className="flex items-center justify-between">
          <div className="tp-checkbox flex items-start space-x-2 mb-3">
            <input id="product-1" type="checkbox" />
            <label htmlFor="product-1" className="text-tiny">
              Remember Me
            </label>
          </div>
          <div className="mb-4">
            <a
              href="#"
              className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
            >
              Forgot Password ?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className={`tp-btn h-[49px] w-full justify-center ${
            logingIn && "hover:bg-blue-200 bg-blue-200"
          }`}
          disabled={logingIn}
        >
          {logingIn ? "Signing In" : "Signin"}
        </button>
      </form>
    </Wrapper>
  );
};

export default Signin;

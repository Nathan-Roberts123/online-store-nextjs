"use client";

import Input from "@/components/ui/input";
import Wrapper from "../components/wrapper";
import FieldLabel from "@/components/forms/field-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZSignupFormState, TSignupFormState } from "@/type";
import FeildErrorMessage from "@/components/forms/field-error-message";
import { trpc } from "@/utils/trpc";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupFormState>({
    resolver: zodResolver(ZSignupFormState),
  });
  const mutation = trpc.user.createUser.useMutation({
    onSuccess({ name }) {
      toast({
        type: "open",
        message: `Created the account for ${name}`,
        variant: "success",
      });
      router.push("/auth/signin");
    },
    onError(error, variables) {
      if (error.message === "user already exist") {
        toast({
          type: "open",
          message: `Email: ${variables.email} is already`,
          variant: "error",
        });
      } else {
        toast({
          type: "open",
          message: `Error while creating an account`,
          variant: "error",
        });
      }
    },
  });

  const onSubmit = (data: TSignupFormState) => {
    mutation.mutate({
      name: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Wrapper type="signup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <FieldLabel required={true}>Username</FieldLabel>
          <Input
            type="text"
            placeholder="Username"
            {...register("username")}
            isInvalid={!!errors.username}
          />
          {errors.username && (
            <FeildErrorMessage message={errors.username.message} />
          )}
        </div>
        <div className="mb-5">
          <FieldLabel required={true}>Email</FieldLabel>
          <Input
            type="email"
            placeholder="Enter Your Email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          {errors.email && <FeildErrorMessage message={errors.email.message} />}
        </div>
        <div className="mb-5">
          <FieldLabel required={true}>Password</FieldLabel>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <FeildErrorMessage message={errors.password.message} />
          )}
        </div>
        <div className="mb-5">
          <FieldLabel required={true}>Confirm Password</FieldLabel>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirm_password")}
            isInvalid={!!errors.confirm_password}
          />
          {errors.confirm_password && (
            <FeildErrorMessage message={errors.confirm_password.message} />
          )}
        </div>
        <button
          className={`tp-btn h-[49px] w-full justify-center ${
            mutation.isPending && "hover:bg-blue-200 bg-blue-200"
          }`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </Wrapper>
  );
};

export default Signup;

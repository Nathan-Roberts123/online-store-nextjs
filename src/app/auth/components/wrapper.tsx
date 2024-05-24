import React from "react";
import GoogleButton from "./google-button";
import Link from "next/link";
import Image from "next/image";

const Header = ({ type }: { type: "signin" | "signup" }) => {
  return (
    <div className="text-center">
      {type === "signin" ? (
        <>
          <h4 className="text-[24px] mb-1">Login Now.</h4>
          <p>
            Don&apos;t have an account?{" "}
            <span>
              {" "}
              <Link href="/auth/signup" className="text-theme">
                Sign Up
              </Link>{" "}
            </span>
          </p>
        </>
      ) : (
        <div className="text-center">
          <h4 className="text-[24px] mb-1">Register Now.</h4>
          <p>
            Already have an account?{" "}
            <span>
              {" "}
              <Link href="/auth/signin" className="text-theme">
                Sign In
              </Link>{" "}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const Wrapper = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "signin" | "signup";
}) => {
  return (
    <div className="tp-main-wrapper h-full">
      <div className="container mx-auto my-auto h-full flex items-center justify-center">
        <div className="">
          <div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md ">
            <div className="col-span-4 lg:col-span-6 relative h-full hidden lg:block">
              <div className="data-bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat">
                <Image
                  objectFit="cover"
                  layout="fill"
                  objectPosition="left"
                  src="/sign-bg-image.jpg"
                  alt="Signup image"
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 md:w-[500px] mx-auto my-auto  pt-[50px] py-[60px] px-5 md:px-[60px]">
              <div className="mt-4">
                <Header type={type} />
                <GoogleButton />
              </div>

              <div className="my-6 flex items-center space-x-3">
                <div className="h-px flex-1 bg-slate-200"></div>
                <p className="mb-0">OR</p>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

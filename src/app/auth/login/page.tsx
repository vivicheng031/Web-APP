"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

import AuthInput from "../_components/AuthInput";
import "../_components/style.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";

const roadrage = localFont({
  src: "../../fonts/RoadRage-Regular.ttf",
  weight: "700",
  style: "italic",
});

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("null");
  const [passwordError, setPasswordError] = useState<string>("null");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if email or password is empty
    if (!email) setEmailError("email");
    if (email) setEmailError("null");
    if (!password) setPasswordError("password");
    if (password) setPasswordError("null");

    if (email && password) {
      try {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/painting`,
        });
      } catch (e) {
        setEmailError("wrong");
        setPasswordError("wrong");
        console.log(e);
        // router.push("/auth/login");
      }
    }
  };

  return (
    <div className="relative z-50 flex min-h-screen items-center justify-center">
      <Card className="h-auto w-4/5 bg-[#FCEFCD] md:w-[600px] lg:w-[800px]">
        <CardHeader>
          <CardTitle
            className={`${roadrage.className} flex items-center justify-around text-4xl`}
          >
            <Link href="/" className="mr-4 flex items-center">
              <div className="h-185 w-185">
                <Image
                  src="/logo.png"
                  alt="Souly Logo"
                  className="mr-2"
                  width={185}
                  height={185}
                />
              </div>
            </Link>
            <div className="hidden items-center text-9xl text-[#D88253] md:flex">
              <p className="text-description mr-2">Start Your Journey</p>
            </div>
            <div className="flex-col items-center justify-center text-8xl text-[#D88253] md:hidden">
              <p className="text-description mr-2">Start</p>
              <p className="text-description mr-2">Your</p>
              <p className="text-description mr-2">Journey</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={`${roadrage.className} flex flex-col items-center`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <AuthInput
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
              error={emailError}
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              error={passwordError}
            />
            <Button
              type="submit"
              className={`${roadrage.className} flex w-1/4 rounded-xl border-[5px] border-[#a8450f] bg-orange-200 p-8 text-center text-6xl`}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;

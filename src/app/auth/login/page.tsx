"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import AuthInput from "../_components/AuthInput";
import "../_components/style.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";

const backgroundColor = "#FCEFCD";

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
          callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/personal`,
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
    <div className="bg-brand relative z-50 flex min-h-screen items-center justify-center">
      <Card
        className="bg-brand flex h-full w-4/5 flex-col rounded-xl md:w-[600px] lg:w-[800px]"
        style={{ backgroundColor }}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-4xl">
            <Link href="/" className="mr-4 flex items-center">
              <div className="h-193 w-193">
                <Image
                  src="/logo.png"
                  alt="Souly Logo"
                  className="mr-2 w-full"
                  width={190}
                  height={190}
                />
              </div>
            </Link>
            <div className="hidden items-center text-6xl md:flex">
              <p className="text-description mr-2">Start Your Journey</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-grow flex-col">
          <form
            onSubmit={handleSubmit}
            className="mr-8 flex flex-col gap-4 max-md:text-4xl"
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

            <div className="flex justify-center">
              <Button
                type="submit"
                className="custom-max-width border-bdr bg-btn_2 text-txt button-custom-border button-custom-background w-full rounded-2xl border-4 text-center text-4xl"
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;

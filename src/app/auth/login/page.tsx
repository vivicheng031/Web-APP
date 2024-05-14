"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import AuthInput from "../_components/AuthInput";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";

import "../_components/style.css"

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
      <Card className="rounded-xl bg-brand w-4/5 md:w-[600px] lg:w-[800px] flex flex-col h-full" style={{ backgroundColor }}>
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
            <div className="hidden items-center md:flex text-6xl">
              <p className="text-description mr-2">Start Your Journey</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full flex-grow">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mr-8 max-md:text-4xl">
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
                className="custom-max-width border-bdr bg-btn_2 text-txt w-full rounded-2xl border-4 text-center text-4xl button-custom-border button-custom-background"
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

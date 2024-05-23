import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import "./style.css";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  error: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AuthInput({ label, type, value, error, setValue }: Props) {
  return (
    <>
      <div
        className={`${
          error !== "null" ? "mb-0" : "mb-2"
        } flex w-full flex-col items-center gap-4 text-center md:flex-row`}
      >
        <Label className="w-[200px] text-center text-6xl md:justify-center">
          {label}
        </Label>
        <Input
          type={type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={`${
            error !== "null" ? "border-red-700" : "border-brown"
          } w-[600px] py-6 text-6xl text-gray-900`}
          style={{ background: "#D1C1A1", borderWidth: "6px" }}
        />
      </div>
      <div className="mb-1 flex w-full flex-col items-center text-center md:ml-32 md:flex-row">
        <div className="w-[140px]"></div>
        <div className="text-4xl text-red-700">
          {error == "email"
            ? "Email may not be empty. Please enter your email."
            : error == "password"
              ? "Password may not be empty. Please enter your password."
              : error == "wrong"
                ? "Wrong email or password. Please try again."
                : null}
        </div>
      </div>
    </>
  );
}

export default AuthInput;

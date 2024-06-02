import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  placeholder: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function DialogInput({ placeholder, label, type, value, setValue }: Props) {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-4 text-center md:flex-row">
        <Label className="w-1/4 text-4xl text-[#846425]">{label}</Label>
        <Input
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="items-center rounded-lg border-[5px] border-[#846425] bg-[#D1C1A1] py-5 text-4xl text-black"
        />
      </div>
    </>
  );
}

export default DialogInput;

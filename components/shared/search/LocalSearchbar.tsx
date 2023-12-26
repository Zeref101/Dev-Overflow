"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface customInputProps {
  route: string;
  iconPosition: string;
  imgsrc: string;
  placeholder: string;
  otherClasses?: string; // ?: ?-> optional
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgsrc,
  placeholder,
  otherClasses,
}: customInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-xl px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgsrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        onChange={() => {}}
        value=""
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none "
      />

      {iconPosition === "right" && (
        <Image
          src={imgsrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      height="100"
      width="100"
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
    />
  );
};

export default Logo;

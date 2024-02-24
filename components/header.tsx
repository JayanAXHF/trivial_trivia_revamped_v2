"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex justify-end py-4 px-10">
      <Button variant={"link"} asChild>
        <Link href="/api/auth/logout">Logout</Link>
      </Button>
    </div>
  );
};

export default Header;

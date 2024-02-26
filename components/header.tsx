"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ModeToggle } from "./ColourThemeToggle";

const Header = () => {
  const user = useUser();
  return (
    <div className="w-full flex justify-end py-4 px-10">
      {user?.user && (
        <Button variant={"link"} asChild>
          <Link href="/api/auth/logout">Logout</Link>
        </Button>
      )}
      <ModeToggle />
    </div>
  );
};

export default Header;

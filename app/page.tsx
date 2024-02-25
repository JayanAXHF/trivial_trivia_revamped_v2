"use client";

import { Button } from "@/components/ui/button ";
import "./globals.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/header ";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";

export default function Home() {
  const user = useUser();
  return (
    <div className={`h-screen w-screen grid ${!user?.user && "items-center"}`}>
      {user?.user && <Header />}
      <div className="flex flex-col gap-y-9">
        <h1 className=" font-[Arima Madurai] text-8xl text-center">
          Trivial Trivia
        </h1>
        <div
          className="text-center flex gap-x-9 j justify-center items-center
        "
        >
          {!user?.user ? (
            <>
              <Button variant={"default"} size={"lg"} className="w-max">
                Sign Up
              </Button>
              <Button
                asChild
                variant={"secondary"}
                size={"lg"}
                className="w-max"
              >
                <Link href="/api/auth/login">Login</Link>
              </Button>
            </>
          ) : (
            <>
              {/* <Button variant={"secondary"} className="w-max">
                Options
              </Button> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-max" variant="secondary">
                    Options
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button asChild variant={"default"} size={"lg"} className="w-max">
                <Link href="/trivia">Start</Link>
              </Button>
              <Button variant={"ghost"} className="w-max">
                Stats
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

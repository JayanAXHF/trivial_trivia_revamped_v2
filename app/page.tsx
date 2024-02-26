"use client";

import { Button } from "@/components/ui/button ";
import "./globals.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/header ";

import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator ";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select ";
import { Input } from "@/components/ui/input ";
import StatsModal from "@/components/StatsModal ";

interface linkData {
  category: string;
  difficulty: string;
  number_questions: number;
}

const categories = [
  "music",
  "sport_and_leisure",
  "film_and_tv",
  "arts_and_literature",
  "history",
  "society_and_culture",
  "science",
  "geography",
  "food_and_drink",
  "general_knowledge",
];

export default function Home() {
  const [linkData, setLinkData] = useState<linkData>({
    category: " ",
    number_questions: 10,
    difficulty: "easy,medium,hard",
  });
  const [link, setLink] = useState("https://the-trivia-api.com/v2/questions");
  const user = useUser();

  useEffect(() => {
    console.debug(link);
  }, [link]);

  const changeLink = () => {
    setLink(
      `https://the-trivia-api.com/v2/questions?${
        linkData.category !== "" && `categories=${linkData.category}`
      }${
        linkData.difficulty !== "" && `&difficulty=${linkData.difficulty}`
      }${`&limit=${linkData.number_questions}`}`
    );
  };
  return (
    <div>
      <div className={`h-screen w-screen grid `}>
        {<Header />}
        <div className="flex flex-col gap-y-9">
          <h1 className="  text-8xl text-center">Trivial Trivia</h1>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-max" variant="secondary">
                      Options
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Trivia Settings</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Difficulties
                    </h4>
                    <Select
                      onValueChange={(val) => {
                        setLinkData((prevState) => {
                          return { ...prevState, category: val };
                        });
                      }}
                    >
                      <SelectTrigger className=" px-5">
                        <SelectValue placeholder="Select A Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => {
                            return (
                              <SelectItem value={category}>
                                {(
                                  category.charAt(0).toUpperCase() +
                                  category.slice(1)
                                ).replaceAll("_", " ")}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Separator />
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Difficulties
                    </h4>
                    <ToggleGroup
                      type="multiple"
                      onValueChange={(val) => {
                        setLinkData((prevState) => {
                          return { ...prevState, difficulty: val.join(",") };
                        });
                      }}
                      value={linkData.difficulty.split(",")}
                    >
                      <ToggleGroupItem value="easy">Easy</ToggleGroupItem>
                      <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
                      <ToggleGroupItem value="hard">Hard</ToggleGroupItem>
                    </ToggleGroup>
                    <Separator />
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Number of Questions
                    </h4>
                    <Input
                      value={linkData.number_questions}
                      onChange={(val) => {
                        setLinkData((prevState) => {
                          return {
                            ...prevState,
                            number_questions: Number(val.target.value),
                          };
                        });
                      }}
                      type="number"
                      max={50}
                    />
                    <DialogFooter className="flex items-center">
                      <DialogClose asChild>
                        <Button onClick={changeLink}>Done</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant={"destructive"}>
                          Reset to Default
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  asChild
                  variant={"default"}
                  size={"lg"}
                  className="w-max"
                >
                  <Link
                    href={`/trivia/${linkData.category}/${linkData.difficulty}/${linkData.number_questions}`}
                  >
                    Start
                  </Link>
                </Button>
                <StatsModal />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

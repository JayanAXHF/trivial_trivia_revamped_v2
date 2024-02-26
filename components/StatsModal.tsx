"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useUser } from "@auth0/nextjs-auth0/client";
import { database } from "@/firebase ";
import { ref, child, get } from "firebase/database";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

const StatsModal = () => {
  const [stats, setStats] = useState<any>([]);
  const user = useUser();
  const fetchStats = async () => {
    const dbRef = ref(database);

    get(child(dbRef, `userData/${user?.user?.sid}`))
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          let tempData = Object.entries(snapshot.val());
          tempData.reverse();
          setStats(tempData);

          console.log(`JSC ~ .then ~ tempData:`, tempData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>Stats</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Statistics</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ScrollArea className=" max-h-96 grid grid-flow-row gap-y-10">
            {stats.map((stat: any, index: number) => {
              return (
                <Card className="my-5" key={index}>
                  <CardHeader>
                    <CardTitle className="scroll-m-20  pb-2 text-3xl font-bold tracking-tight first:mt-0 ">
                      {stat[1].score}/{stat[1].num_questions}
                    </CardTitle>
                    <CardDescription className="">
                      At {new Date(Number(stat[0])).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full grid grid-flow-col grid-cols-1 md:grid-cols-2">
                      <div>
                        {" "}
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Category
                        </h3>
                        <p className="scroll-m-20 text-lg text-gray-400      tracking-tight">
                          {stat[1].category
                            .replace("%20", "All")
                            .charAt(0)
                            .toUpperCase() +
                            stat[1].category.replace("%20", "All").slice(1)}
                        </p>
                      </div>
                      <div>
                        {" "}
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                          Difficulty
                        </h3>
                        <p className="scroll-m-20 text-lg tracking-tight text-gray-400">
                          {stat[1].difficulty.replaceAll("%2C", ", ")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatsModal;

"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area ";
interface selectedOption {
  question_number?: number;
  option?: string;
}

const Trivia = () => {
  const [selectedOptions, setSelectedOptions] = useState<selectedOption[]>([
    {},
  ]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();

    return () => {};
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch("https://the-trivia-api.com/v2/questions");
    const data = await res.json();
    console.log(data);
    setQuestions(data);
  };

  return (
    <div className="h-screen w-screen p-36">
      <ScrollArea className="w-full h-full bg-[#0a0a0a] p-20 rounded-3xl">
        {questions && questions.map((question: any, index: number) => {})}
      </ScrollArea>
    </div>
  );
};

export default Trivia;

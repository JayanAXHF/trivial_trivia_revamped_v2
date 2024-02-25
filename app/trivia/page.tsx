"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area ";
import Question from "@/components/ui/Question ";
import { Button } from "@/components/ui/button ";
interface selectedOption {
  question_number?: number;
  option?: string;
}
function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Trivia = () => {
  const [selectedOptions, setSelectedOptions] = useState<selectedOption[]>([
    {},
  ]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    fetchQuestions();

    return () => {};
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch("https://the-trivia-api.com/v2/questions");
    const data = await res.json();
    let refData: any[] = [];

    data.forEach((element: any) => {
      refData.push({
        ...element,
        answers: shuffle([...element.incorrectAnswers, element.correctAnswer]),
      });
    });
    let temp = [];
    for (let index = 0; index < refData.length; index++) {
      temp.push({ question_number: index + 1 });
    }

    setSelectedOptions(temp);
    setQuestions(refData);
  };

  // const tempCheck = () => {};

  useEffect(() => {
    console.log(`JSC ~ useEffect ~ selectedOptions:`, selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="h-screen w-screen p-36">
      <ScrollArea className="w-full h-full bg-[#0a0a0a] p-20 rounded-3xl grid grid-flow-row gap-y-20">
        {questions.length !== 0 &&
          questions.map((question: any, index: number) => {
            return (
              <Question
                question={question.question.text as string}
                correct_answer={question.correctAnswer as string}
                answers={question.answers}
                questionNumber={index + 1}
                setSelectedOptions={setSelectedOptions}
              />
            );
          })}
        <Button className="mx-10 my-5">Check</Button>
      </ScrollArea>
    </div>
  );
};

export default Trivia;

"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area ";
import Question from "@/components/ui/Question ";
import { Button } from "@/components/ui/button ";
import QuestionCheck from "@/components/ui/QuestionCheck ";
import Link from "next/link";
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
  const [record, setRecord] = useState<(0 | 1)[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
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

  const tempCheck = () => {
    for (let index = 0; index < questions.length; index++) {
      if (selectedOptions[index].option === questions[index].correctAnswer) {
        setScore((prevState) => {
          return (prevState + 1) as number;
        });
        setRecord((prevState) => {
          return [...prevState, 1];
        });
      } else {
        setRecord((prevState) => {
          return [...prevState, 0];
        });
      }
    }
    setIsChecking(true);
  };

  useEffect(() => {
    console.log(`JSC ~ useEffect ~ selectedOptions:`, selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="h-screen w-screen p-36 md:p-16">
      <ScrollArea className="w-full h-full bg-[#0a0a0a] p-20 rounded-3xl grid grid-flow-row gap-y-20">
        {!isChecking ? (
          <>
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
            <Button className="mx-10 my-5" onClick={tempCheck}>
              Check
            </Button>
          </>
        ) : (
          <>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 px-10">
              Final Score: {score}/{questions.length}
            </h2>
            {questions.length !== 0 &&
              questions.map((question: any, index: number) => {
                return (
                  <QuestionCheck
                    question={question.question.text as string}
                    correct_answer={question.correctAnswer as string}
                    answers={question.answers}
                    questionNumber={index + 1}
                    isCorrectAnswer={record[index]}
                    chosenAnswer={selectedOptions[index].option as string}
                  />
                );
              })}
            <div className="flex flex-row px-10 gay-x-5 ">
              <Button
                className="mx-2.5"
                onClick={() => {
                  fetchQuestions();
                  setIsChecking(false);
                  setScore(0);
                  setRecord([]);
                }}
              >
                Play Again
              </Button>
              <Button variant={"link"} className="mx-2.5" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default Trivia;

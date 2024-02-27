"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area ";
import Question from "@/components/ui/Question ";
import { Button } from "@/components/ui/button ";
import QuestionCheck from "@/components/ui/QuestionCheck ";
import Link from "next/link";
import { ref, set } from "firebase/database";
import { database as db } from "../../../firebase";

import { useUser } from "@auth0/nextjs-auth0/client";

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

const Trivia = ({ params }: { params: { linkData: any[] } }) => {
  const [selectedOptions, setSelectedOptions] = useState<selectedOption[]>([
    {},
  ]);
  const user = useUser();
  const [questions, setQuestions] = useState<any[]>([]);
  const [record, setRecord] = useState<(0 | 1)[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  useEffect(() => {
    fetchQuestions();
    console.debug(user);
    return () => {};
  }, []);

  const changeLink = (
    category: string,
    difficulty: string,
    number_questions: number
  ) => {
    const link = `https://the-trivia-api.com/v2/questions?${
      category !== "" && `categories=${category}`
    }${
      difficulty !== "" && `&difficulty=${difficulty}`
    }${`&limit=${number_questions}`}`;

    return link;
  };

  const fetchQuestions = async () => {
    const link = params.linkData
      ? changeLink(
          params.linkData[0] || "",
          params.linkData[1] || "",
          Number(params.linkData[2]) || 0
        )
      : "https://the-trivia-api.com/v2/questions";
    console.log(`JSC ~ fetchQuestions ~ link:`, link);
    console.table(params.linkData);
    const res = await fetch(link);
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

  const submitAnswer = async () => {
    const timestamp = Date.now();
    let tempScore: number = 0;
    for (let index = 0; index < questions.length; index++) {
      if (selectedOptions[index].option === questions[index].correctAnswer) {
        tempScore += 1;
      }
    }
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
    console.debug(score);
    await set(
      ref(db, "userData/" + user.user?.sid + "/" + timestamp.toString()),
      {
        score: tempScore,
        record: record,
        category: params.linkData[0],
        difficulty: params.linkData[1],
        num_questions: params.linkData[2],
      }
    );
  };

  useEffect(() => {
    console.log(`JSC ~ useEffect ~ selectedOptions:`, selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="h-screen w-screen lg:p-36 md:p-16 sm:p-6 ">
      <ScrollArea className="w-full h-full dark:bg-[#0a1a1a] bg-[#fafafa] lg:p-20 md:p-16 break-all p-6 rounded-3xl grid grid-flow-row gap-y-20 sm:gap-y-2 py-10">
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
                    key={index}
                  />
                );
              })}
            <Button className="mx-10 my-5" onClick={submitAnswer}>
              Check
            </Button>
            <Button variant={"link"} asChild>
              <Link href="/">Back to Home</Link>
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
                    key={index}
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

import React from "react";

import { Select, SelectTrigger, SelectValue } from "./select";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

interface selectedOption {
  question_number?: number;
  option?: string;
}
interface props {
  question: string;
  correct_answer: string;
  answers: string[];
  questionNumber: number;
  isCorrectAnswer: 0 | 1;
  chosenAnswer: string;
  isNiche?: boolean;
}

const CheckedQuestion = ({
  question,
  correct_answer,
  answers,
  questionNumber,
  isCorrectAnswer,
  chosenAnswer,
  isNiche,
}: props) => {
  let splitAnswer = correct_answer.split(" ");

  const answerDisplay = () => {
    if (splitAnswer.length <= 5) {
      return <h6 className="font-bold leading-7 p-5">{correct_answer}</h6>;
    } else {
      splitAnswer.length = 5;

      return (
        <h6 className="font-bold leading-7 p-5">{splitAnswer.join(" ")}...</h6>
      );
    }
  };
  return (
    <div className="p-10 w-full">
      <h5 className="font-bold p-2">
        Q{questionNumber}. {question}
      </h5>
      <div className="flex w-full md:flex-row flex-col  md:items-center md:gap-x-5 md:justify-between">
        <ToggleGroup
          type="single"
          value={chosenAnswer}
          orientation="vertical"
          variant={"outline"}
          className="w-full invisible md:visible flex justify-center gap-y-5"
        >
          {!isCorrectAnswer ? (
            <>
              {answers.map((answer, index) => {
                return (
                  <ToggleGroupItem
                    key={index}
                    value="answer"
                    className={
                      answer === chosenAnswer
                        ? "bg-red-500"
                        : answer === correct_answer
                        ? "bg-green-500"
                        : ""
                    }
                  >
                    {answer}
                  </ToggleGroupItem>
                );
              })}
            </>
          ) : (
            <>
              {answers.map((answer, index) => {
                return (
                  <ToggleGroupItem
                    value="answer"
                    className={answer === correct_answer ? "bg-green-500" : ""}
                    key={index}
                  >
                    {answer}
                  </ToggleGroupItem>
                );
              })}
            </>
          )}
        </ToggleGroup>
        <Select>
          <SelectTrigger
            className={` px-10 md:hidden ${
              isCorrectAnswer ? "bg-green-500 w-full" : "bg-red-500 md:w-1/2"
            }`}
          >
            <SelectValue placeholder={chosenAnswer} />
          </SelectTrigger>
        </Select>
        <span className="md:invisible">
          {!isCorrectAnswer && answerDisplay()}
        </span>
      </div>
    </div>
  );
};

export default CheckedQuestion;

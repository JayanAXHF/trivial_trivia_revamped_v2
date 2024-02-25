import React from "react";

import { Select, SelectTrigger, SelectValue } from "./select";

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
}

const CheckedQuestion = ({
  question,
  correct_answer,
  answers,
  questionNumber,
  isCorrectAnswer,
  chosenAnswer,
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
    <div className="p-10">
      <h5 className="font-bold p-2">
        Q{questionNumber}. {question}
      </h5>
      <div className="flex flex-row items-center gap-x-5 justify-between">
        <Select>
          <SelectTrigger
            className={` px-10 ${
              isCorrectAnswer ? "bg-green-500 w-full" : "bg-red-500 w-1/2"
            }`}
          >
            <SelectValue placeholder={chosenAnswer} />
          </SelectTrigger>
        </Select>
        {!isCorrectAnswer && answerDisplay()}
      </div>
    </div>
  );
};

export default CheckedQuestion;

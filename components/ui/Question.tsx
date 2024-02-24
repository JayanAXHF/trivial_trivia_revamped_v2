import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface selectedOption {
  question_number: number;
  option: string;
}
interface props {
  question: string;
  correct_answer: string;
  answers: string[];
  questionNumber: number;
}

const Question = ({
  question,
  correct_answer,
  answers,
  questionNumber,
}: props) => {
  return (
    <div className="p-20">
      <h5 className="mb-5 font-bold">
        Q{questionNumber}. {question}
      </h5>
      <Select>
        <SelectTrigger className="w-full px-10">
          <SelectValue placeholder="Select an answer" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {answers.map((answer: string, index) => {
              return <SelectItem value={answer}>{answer}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Question;

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
  question_number?: number;
  option?: string;
}
interface props {
  question: string;
  correct_answer: string;
  answers: string[];
  questionNumber: number;
  setSelectedOptions: React.Dispatch<React.SetStateAction<selectedOption[]>>;
}

const Question = ({
  question,
  correct_answer,
  answers,
  questionNumber,
  setSelectedOptions,
}: props) => {
  const onChange = (val: string) => {
    const rightOne = (element: selectedOption) =>
      element.question_number === questionNumber;
    setSelectedOptions((prev) => {
      const index = prev.findIndex(rightOne);
      prev[index] = { question_number: questionNumber, option: val };

      return prev;
    });
  };

  return (
    <div className="p-10">
      <h5 className="font-bold p-2">
        Q{questionNumber}. {question}
      </h5>
      <Select onValueChange={onChange}>
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

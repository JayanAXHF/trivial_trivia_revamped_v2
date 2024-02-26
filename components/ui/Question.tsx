import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Badge } from "./badge";

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
  isNiche?: boolean;
}

const Question = ({
  question,
  correct_answer,
  answers,
  questionNumber,
  setSelectedOptions,
  isNiche,
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
        Q{questionNumber}. {question}{" "}
        <Badge className={`${!isNiche && "hidden"}`}>Niche</Badge>
      </h5>

      <ToggleGroup
        onValueChange={onChange}
        type="single"
        variant={"outline"}
        className="w-full invisible md:visible md:flex justify-center gap-x-10"
      >
        {answers.map((answer: string, index) => {
          return <ToggleGroupItem value={answer}>{answer}</ToggleGroupItem>;
        })}
      </ToggleGroup>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full px-10 md:hidden">
          <SelectValue placeholder="Select an answer" />
        </SelectTrigger>
        <SelectContent className="md:hidden overflow-hidden">
          <SelectGroup>
            {answers.map((answer: string, index) => {
              return (
                <SelectItem value={answer} className=" overflow-hidden">
                  {answer}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Question;

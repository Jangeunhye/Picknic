"use client";

import { useOption } from "@/contexts/option.context";
import { MouseEventHandler } from "react";

function OptionItem({
  inputValue,
  title,
}: {
  inputValue: string;
  title: string;
}) {
  const userOption = useOption();

  const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
    userOption.updateUserOption({
      optionKey: title,
      optionValue: e.currentTarget.value,
    });
  };
  return (
    <div className="flex flex-col">
      <input
        type="radio"
        value={inputValue}
        id={`${title}-${inputValue}`}
        name={title}
        onClick={handleClick}
        required
      />
      <label htmlFor={inputValue}>{inputValue}</label>
    </div>
  );
}

export default OptionItem;

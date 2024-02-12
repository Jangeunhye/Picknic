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
    <div className="flex flex-col gap-3 w-[80px]">
      <input
        type="radio"
        value={inputValue}
        id={`${title}-${inputValue}`}
        name={title}
        onClick={handleClick}
        required
        className={` w-[40px] checked:scale-75 mx-auto h-[40px] cursor-pointer custom-radio`}
      />
      <label
        htmlFor={inputValue}
        className={` text-[20px] text-center 
          opacity-60
        `}
      >
        {inputValue}
      </label>
    </div>
  );
}

export default OptionItem;

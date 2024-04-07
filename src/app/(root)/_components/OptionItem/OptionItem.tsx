import { OptionValue, useOption } from "@/contexts/option.context";
import { MouseEventHandler } from "react";

function OptionItem({
  inputValue,
  title,
}: {
  inputValue: string;
  title: string;
}) {
  const { userOption, updateUserOption } = useOption();

  const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
    const optionValue = e.currentTarget.value;
    updateUserOption({
      optionKey: title,
      optionValue: optionValue,
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
        className={`sm:w-[30px] sm:h-[30px] w-[40px] checked:scale-75 mx-auto h-[40px] cursor-pointer custom-radio`}
      />
      <label
        htmlFor={inputValue}
        className={`text-[20px] sm:text-sm text-center text-opacity-60 ${
          userOption[title as keyof OptionValue] === inputValue
            ? "text-opacity-100 font-bold"
            : ""
        }`}
      >
        {inputValue}
      </label>
    </div>
  );
}

export default OptionItem;

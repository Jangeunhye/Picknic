import { Option } from "@/types/Option.type";
import OptionItem from "../OptionItem";

function OptionGroup({ option, type }: { option: Option; type: string }) {
  const title = option.title;
  const firstInput = option.labels.firstInput;
  const secondInput = option.labels.secondInput;
  const thirdInput = option.labels.thirdInput;

  return (
    <div
      className={`select-none sm:w-full sm:mx-auto w-[500px] mb-10 py-[2px] px-[2px] h-[140px] ${
        type === "even" ? "gradient-background-even" : "gradient-background-odd"
      }`}
    >
      <div className="flex relative w-full h-full gap-24 sm:gap-14 justify-center sm:justify-around items-center ">
        <OptionItem inputValue={firstInput} title={title} />
        <OptionItem inputValue={secondInput} title={title} />
        <OptionItem inputValue={thirdInput} title={title} />
      </div>
    </div>
  );
}

export default OptionGroup;

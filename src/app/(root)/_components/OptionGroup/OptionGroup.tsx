import { Option } from "@/types/Option.type";
import OptionItem from "../OptionItem";

function OptionGroup({ option }: { option: Option }) {
  const title = option.title;
  const firstInput = option.labels.firstInput;
  const secondInput = option.labels.secondInput;
  const thirdInput = option.labels.thirdInput;

  return (
    <div className="flex">
      <OptionItem inputValue={firstInput} title={title} />
      <OptionItem inputValue={secondInput} title={title} />
      <OptionItem inputValue={thirdInput} title={title} />
    </div>
  );
}

export default OptionGroup;

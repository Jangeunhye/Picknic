"use client";
import {
  oilyOption,
  riceOption,
  soupOption,
  spicyOption,
} from "@/constants/options";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import OptionGroup from "../OptionGroup";

function OptionsList() {
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    router.push("/result");
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <ul className="flex flex-col">
          <li>
            <OptionGroup option={spicyOption} />
          </li>
          <li>
            <OptionGroup option={oilyOption} />
          </li>
          <li>
            <OptionGroup option={soupOption} />
          </li>
          <li>
            <OptionGroup option={riceOption} />
          </li>
        </ul>
        <button>클릭</button>
      </form>
    </section>
  );
}

export default OptionsList;

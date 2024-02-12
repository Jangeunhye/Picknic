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
    <section className="w-[100%] flex justify-center pt-24 bg-[url('/images/background.jpg')]">
      <form onSubmit={handleSubmit}>
        <ul className="flex flex-col">
          <li>
            <OptionGroup option={spicyOption} type="odd" />
          </li>
          <li>
            <OptionGroup option={oilyOption} type="even" />
          </li>
          <li>
            <OptionGroup option={soupOption} type="odd" />
          </li>
          <li>
            <OptionGroup option={riceOption} type="even" />
          </li>
        </ul>
        <button className=" px-7 py-2 hover:opacity-50 bg-black opacity-75 relative left-1/2 -translate-x-1/2 rounded-xl mb-12 text-white  ">
          완료
        </button>
      </form>
    </section>
  );
}

export default OptionsList;

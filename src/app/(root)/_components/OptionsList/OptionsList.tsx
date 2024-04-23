"use client";
import {
  oilyOption,
  riceOption,
  soupOption,
  spicyOption,
} from "@/constants/options";
import { useOption } from "@/contexts/option.context";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect } from "react";
import OptionGroup from "../OptionGroup";

function OptionsList() {
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    router.push("/result");
  };
  const { resetUserOption } = useOption();

  useEffect(() => {
    resetUserOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full flex justify-center pt-24 md:bg-[url('/images/background.jpg')] lg:bg-[url('/images/background.jpg')] bg-white">
      <form onSubmit={handleSubmit} className="sm:w-[90%]">
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

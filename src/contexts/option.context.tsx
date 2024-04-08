"use client";
import { createContext, useContext, useState } from "react";

type OptionContextValue = {
  userOption: OptionValue;
  updateUserOption: ({
    optionKey,
    optionValue,
  }: {
    optionKey: string;
    optionValue: string;
  }) => void;
  resetUserOption: () => void;
};

export type OptionValue = {
  spicy: string;
  oily: string;
  soup: string;
  rice: string;
};

const initialValue: OptionContextValue = {
  userOption: {
    spicy: "anything",
    oily: "anything",
    soup: "anything",
    rice: "anything",
  },
  updateUserOption: () => {},
  resetUserOption: () => {},
};
const optionContext = createContext(initialValue);

export const useOption = () => useContext(optionContext);

export function OptionProvider({ children }: { children: React.ReactNode }) {
  const [userOption, setUserOption] = useState(initialValue.userOption);

  const updateUserOption = ({
    optionKey,
    optionValue,
  }: {
    optionKey: string;
    optionValue: string;
  }) => {
    setUserOption((current: OptionValue) => {
      return { ...current, [optionKey]: optionValue };
    });
  };

  const resetUserOption = () => {
    setUserOption({
      spicy: "anything",
      oily: "anything",
      soup: "anything",
      rice: "anything",
    });
  };
  const value: OptionContextValue = {
    userOption,
    updateUserOption,
    resetUserOption,
  };

  return (
    <optionContext.Provider value={value}>{children}</optionContext.Provider>
  );
}

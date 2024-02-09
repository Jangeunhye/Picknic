"use client";
import Page from "@/components/Page/Page";
import { useOption } from "@/contexts/option.context";

import { useEffect, useState } from "react";

function ResultPage() {
  const [foodList, setFoodList] = useState<
    {
      title: string;
      spicy: boolean;
      oily: boolean;
      soup: boolean;
      rice: boolean;
    }[]
  >([]);

  useEffect(() => {
    const getFoodList = async () => {
      const response = await fetch(`foodList.json`);
      const data = await response.json();
      setFoodList(data);
    };
    getFoodList();
  }, []);

  const userOptions = useOption();
  const selectedOptions = userOptions.userOption;
  const final = { spicy: false, oily: false, soup: false, rice: false };

  const spicyFilterFoods = foodList.filter((food) => {
    if (selectedOptions.spicy === "매콤") {
      return food.spicy === true;
    } else if (selectedOptions.spicy === "순함") {
      return food.spicy === false;
    } else {
      return true;
    }
  });

  const oilyFilterFoods = spicyFilterFoods.filter((food) => {
    console.log(food.oily);
    if (selectedOptions.oily === "기름진") {
      return food.oily === true;
    } else if (selectedOptions.oily === "담백한") {
      return food.oily === false;
    } else {
      return true;
    }
  });

  const soupFilterFoods = oilyFilterFoods.filter((food) => {
    if (selectedOptions.soup === "국물") {
      return food.soup === true;
    } else if (selectedOptions.soup === "국물없는") {
      return food.soup === false;
    } else {
      return true;
    }
  });

  const finalFilterFoods: {
    title: string;
    spicy: boolean;
    oily: boolean;
    soup: boolean;
    rice: boolean;
  }[] = soupFilterFoods.filter((food) => {
    if (selectedOptions.rice === "밥") {
      return food.rice === true;
    } else if (selectedOptions.rice === "밥이 아닌") {
      return food.rice === false;
    } else {
      return true;
    }
  });

  return (
    <Page>
      {finalFilterFoods.length
        ? finalFilterFoods[Math.floor(Math.random() * finalFilterFoods.length)]
            .title
        : "굶기"}
    </Page>
  );
}

export default ResultPage;

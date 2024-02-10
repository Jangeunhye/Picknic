"use client";
import KakaoMap from "@/components/KaKaoMap/KakaoMap";
import Page from "@/components/Page/Page";
import { useOption } from "@/contexts/option.context";
import { getFilteredFoods } from "@/utils/getFilterFoods";
import { useEffect, useState } from "react";

function ResultPage() {
  const [foodList, setFoodList] = useState([]);
  const [food, setFood] = useState();

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

  const filteredFoods = getFilteredFoods(foodList, selectedOptions);
  const finalFood =
    filteredFoods.length > 0
      ? filteredFoods[Math.floor(Math.random() * filteredFoods.length)].title
      : "";

  return (
    <Page>
      {finalFood}
      <KakaoMap foodKeyword={finalFood} />
    </Page>
  );
}

export default ResultPage;

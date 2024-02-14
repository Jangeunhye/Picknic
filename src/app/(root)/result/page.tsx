"use client";
import Map from "@/components/Map";
import Page from "@/components/Page/Page";
import { useOption } from "@/contexts/option.context";
import { Food } from "@/types/Option.type";
import { getFilteredFoods } from "@/utils/getFilterFoods";
import { useEffect, useState } from "react";
import ResultButtons from "../_components/ResultButtons";
import ResultFood from "../_components/ResultFood";

function ResultPage() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [food, setFood] = useState<string>();
  const userOptions = useOption();
  const [reLoad, setReLoad] = useState(false);
  const [foodList, setFoodList] = useState<Food[]>([]);

  useEffect(() => {
    const getFoodList = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/data/foodList.json`
      );
      const foodList = await response.json();
      setFoodList(foodList);
    };
    getFoodList();
  }, []);

  useEffect(() => {
    const selectedOptions = userOptions.userOption;
    const filteredFoods = getFilteredFoods(foodList, selectedOptions);

    const filterFood =
      filteredFoods.length > 0
        ? filteredFoods[Math.floor(Math.random() * filteredFoods.length)].title
        : "";
    setFood(filterFood);

    setIsMapVisible(false);
  }, [reLoad, foodList]);

  return (
    <Page>
      {food ? (
        <div className=" w-[100%] min-h-[100vh] bg-[#f7f7f7] pt-12 mb-24">
          <ResultFood finalFood={food} />
          <ResultButtons
            isMapVisible={isMapVisible}
            setIsMapVisible={setIsMapVisible}
            setReLoad={setReLoad}
          />
          <div className="mt-24 mx-auto">
            {isMapVisible ? <Map foodKeyword={food} /> : null}
          </div>
        </div>
      ) : null}
    </Page>
  );
}

export default ResultPage;

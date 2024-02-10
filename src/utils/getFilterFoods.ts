import { OptionValue } from "@/contexts/option.context";
import { Food } from "@/types/Option.type";

export const getFilteredFoods = (
  foodList: Food[],
  selectedOptions: OptionValue
): Food[] => {
  const filteredFoods = foodList.filter((food) => {
    return (
      (selectedOptions.spicy === "매콤"
        ? food.spicy === true
        : selectedOptions.spicy === "순함"
        ? food.spicy === false
        : food.spicy === true || food.spicy === false) &&
      (selectedOptions.oily === "기름진"
        ? food.oily === true
        : selectedOptions.oily === "담백한"
        ? food.oily === false
        : food.oily === true || food.oily === false) &&
      (selectedOptions.soup === "국물"
        ? food.soup === true
        : selectedOptions.soup === "국물 없는"
        ? food.soup === false
        : food.soup === true || food.soup === false) &&
      (selectedOptions.rice === "밥"
        ? food.rice === true
        : selectedOptions.rice === "밥이 아닌"
        ? food.rice === false
        : food.rice === true || food.rice === false)
    );
  });
  return filteredFoods;
};

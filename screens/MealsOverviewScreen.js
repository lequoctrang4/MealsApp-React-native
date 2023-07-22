import { CATEGORIES, MEALS } from "../data/dummy-data";
import { useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";
export default function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;
  // const route = useRoute();
  // const catId = route.params.categoryId;

  const disPlayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);
  return <MealsList items={disPlayedMeals} />;
}

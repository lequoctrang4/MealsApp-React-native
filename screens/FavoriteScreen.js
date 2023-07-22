import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/favorites-context";
import MealsList from "../components/MealsList/MealsList";

export default function FavoriteScreen() {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const favoritesMeals = MEALS.filter((meal) =>
    favoriteMealsCtx.ids.includes(meal.id)
  );
  if (!favoritesMeals.length) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }
  return <MealsList items={favoritesMeals} />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

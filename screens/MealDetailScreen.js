import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import { useContext, useLayoutEffect } from "react";
import MealDetails from "../components/MealDetails";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/favorites-context";

export default function MealDetailScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const MealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === MealId);

  const mealIsFavorite = favoriteMealsCtx.ids.includes(MealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) favoriteMealsCtx.removeFavorite(MealId);
    else favoriteMealsCtx.addFavorite(MealId);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            name={mealIsFavorite ? "star" : "star-outline"}
            color={"white"}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        complexity={selectedMeal.complexity}
        duration={selectedMeal.duration}
        affordability={selectedMeal.affordability}
        textStyle={styles.detalText}
      />
      <View style={styles.listContainer}>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Ingredients</Text>
        </View>
        {selectedMeal.ingredients.map((ingredient) => (
          <View key={ingredient} style={styles.listItem}>
            <Text style={styles.itemText}>{ingredient}</Text>
          </View>
        ))}
        <Text style={styles.subTitle}>Steps</Text>
        {selectedMeal.steps.map((step) => (
          <View key={step} style={styles.listItem}>
            <Text style={styles.itemText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detalText: {
    color: "white",
  },
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
  subTitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },

  listContainer: {
    width: "80%",
    alignSelf: "center",
  },
});

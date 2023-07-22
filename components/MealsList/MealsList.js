import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "./MealItem";



export default function MealsList({items}){
    function renderMealItem(itemData) {
      const mealItemProps = itemData.item;
      return <MealItem {...mealItemProps} />;
    }
    return (
      <View styles={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderMealItem}
        />
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

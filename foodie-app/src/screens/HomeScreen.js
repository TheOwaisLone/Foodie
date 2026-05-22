import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FoodItem from "../components/FoodItem";
import { COLORS } from "../constants/theme";
import { getFoodList } from "../services/api";

const categories = ["All", "Salad", "Rolls", "Desserts", "Cake"];

const HomeScreen = () => {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFoodList();
      if (data.success) setFoods(data.data);
    };
    fetchData();
  }, []);

  const filteredFoods =
    category === "All"
      ? foods
      : foods.filter((item) => item.category === category);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Foodie 🍔</Text>

      {/* Categories (horizontal like ExploreMenu) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.category, category === cat && styles.activeCategory]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={{
                color: category === cat ? "#fff" : "#000",
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Food List */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <FoodItem item={item} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: COLORS.primary,
  },
});

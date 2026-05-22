import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ item }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  const count = cartItems[item._id] || 0;

  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${url}/images/${item.image}` }}
          style={styles.image}
        />

        {/* Add / Counter */}
        {count === 0 ? (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(item._id)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => removeFromCart(item._id)}>
              <Text style={styles.counterBtn}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>{count}</Text>

            <TouchableOpacity onPress={() => addToCart(item._id)}>
              <Text style={styles.counterBtn}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item.name}</Text>
        </View>

        <Text style={styles.desc}>{item.description}</Text>

        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 150,
  },

  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.primary,
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  counter: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  counterBtn: {
    fontSize: 18,
    paddingHorizontal: 8,
  },

  count: {
    fontSize: 14,
    marginHorizontal: 5,
  },

  info: {
    padding: 15,
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 18,
    fontWeight: "500",
  },

  desc: {
    fontSize: 12,
    color: "#676767",
    marginTop: 5,
  },

  price: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

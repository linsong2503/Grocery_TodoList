import { GroceryItem } from "@/store/store";
import { View, Text, StyleSheet,Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Category } from "@/store/store";
import { act, useState } from "react";

const categoryIcons:any = {
  Produce: "leaf",
  Dairy: "cheese",
  Bakery: "bread-slice",
  Pantry: "jar-wheat",
  Snack: "candy-cane",
  Food: "cow"
}

const categories = ["Produce", "Dairy", "Bakery", "Pantry", "Snack", "Food"];


const CategoryCard = () => {
  const [category, setCategory] = useState<Category>("Snack");

  return (
    <View style={styles.categoryContainer}>
      {
        categories.map((opt:any) => {
          const active = opt === category;
          return (
              <Pressable
                key={opt}
                onPress={() => setCategory(opt)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingInline: 7,
                  paddingBlock: 5,
                  borderRadius: 20,
                  borderWidth: 1,
                  backgroundColor: `${active ? "#2D1B0E" : "#f2e2c4"}`,
                  gap:5
                }}
            >
              <FontAwesome6 name={`${categoryIcons[opt]}`} color={`${active?"#ffffff":"#5b7567"}`} />
              <Text style={{
                color:`${active?"#ffffff":""}`
                }}>{opt}</Text>
              </Pressable>
          )
        })
     }
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    borderRadius: 20,
    // backgroundColor: "#B988B7",
    gap: 10,
    flexDirection:"row",
    flexWrap: "wrap",
    padding: 10,
  },
  text: {
    fontWeight: 400,
    fontSize:10
  }
})

export default CategoryCard;
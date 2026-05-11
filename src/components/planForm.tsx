import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Priority, useStore } from "@/store/store";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Category } from "@/store/store";
import { ExpoRoot } from "expo-router";

const categoryIcons: any = {
  Produce: "leaf",
  Dairy: "cheese",
  Bakery: "bread-slice",
  Pantry: "jar-wheat",
  Snack: "candy-cane",
  Food: "cow",
};

const categories = ["Snack", "Produce", "Dairy", "Bakery", "Pantry", "Food"];
const priorities = ["Low", "Medium", "High"];

const PlanForm = () => {
  const { error, addItem } = useStore();

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<Category>("Snack");
  const [priority, setPriority] = useState<Priority>("Low");

  const handleQuantityChange = (value: string) => {
    setQuantity(value.replace(/[^0-9]/g, ""));
  };

  const handleCreateItem = async () => {
    await addItem({
      name: itemName.trim(),
      category,
      priority,
      quantity: Number(quantity),
    });

    Alert.alert("Success", "Successfully created item");

    setItemName("");
    setQuantity("1");
    setCategory("Snack");
    setPriority("Low");
  };

  const canAdd = itemName.trim().length > 0;

  return (
    <View>
      <Text style={styles.input_title}>Item names</Text>
      <View style={styles.inputBox}>
        <FontAwesome6
          name="bag-shopping"
          size={13}
          color="#5b7567"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={setItemName}
          placeholder="Eg: Beef"
          placeholderTextColor="gray"
        />
      </View>
      <Text style={styles.input_title}>Quantity</Text>
      <View style={styles.inputBox}>
        <FontAwesome6
          name="hashtag"
          size={13}
          color="#5b7567"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="number-pad"
          placeholder=""
        />
      </View>
      {/*Categroy*/}
      <View>
        <Text style={styles.input_title}>Category</Text>
        <View>
          {/*<CategoryCard/>*/}
          <View style={styles.categoryContainer}>
            {categories.map((opt: any) => {
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
                    gap: 5,
                  }}
                >
                  <FontAwesome6
                    name={`${categoryIcons[opt]}`}
                    color={`${active ? "#ffffff" : "#5b7567"}`}
                  />
                  <Text
                    style={{
                      color: `${active ? "#ffffff" : ""}`,
                    }}
                  >
                    {opt}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
      {/*Priority*/}
      <View>
        <Text style={styles.input_title}>Priority</Text>
        <View style={styles.priorityContainer}>
          {priorities.map((opt: any) => {
            const active = opt === priority;
            return (
              <Pressable
                key={opt}
                onPress={() => setPriority(opt)}
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingInline: 7,
                  paddingBlock: 5,
                  backgroundColor: `${active ? "#2D1B0E" : "#f2e2c4"}`,
                }}
              >
                <Text
                  style={{
                    color: `${active ? "#ffffff" : ""}`,
                  }}
                >
                  {opt}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      {/*Button*/}
      <Pressable
        onPress={handleCreateItem}
        disabled={!canAdd}
        style={{
          marginTop: 5,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          gap: 5,
          backgroundColor: `${canAdd ? "green" : "gray"}`,
          borderColor: `${canAdd ? "green" : ""}`,
        }}
      >
        <FontAwesome6
          name={"plus"}
          size={15}
          color={`${canAdd ? "white" : ""}`}
        />
        <Text
          style={{
            color: `${canAdd ? "white" : ""}`,
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          Add To List
        </Text>
      </Pressable>

      {error ? (
        <View
          style={{
            marginTop: 5,
            paddingInline: 6,
            paddingBlock: 4,
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 20,
            }}
          >
            error
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingInline: 7,
    paddingBlock: 6,
    marginBottom: 10,
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    paddingInline: 25,
    paddingBlock: 10,
  },
  input_title: {
    fontWeight: 400,
    fontSize: 15,
  },
  icon: {
    position: "absolute",
    marginLeft: 15,
    marginTop: 5,
  },
  categoryContainer: {
    borderRadius: 20,
    // backgroundColor: "#B988B7",
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  text: {
    fontWeight: 400,
    fontSize: 10,
  },
  priorityContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
});

export default PlanForm;

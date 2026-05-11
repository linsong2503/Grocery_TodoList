import { useStore } from "@/store/store";
import { Pressable, Text } from "react-native";

const ClearButton = () => {
  const { clearPurchasedList } = useStore();
  return (
    <Pressable
      onPress={() => clearPurchasedList()}
      style={{
        backgroundColor: "green",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "green",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          textTransform: "uppercase",
          color: "#FFFFFF",
          fontWeight: 500,
        }}
      >
        Clear Your List{" "}
      </Text>
    </Pressable>
  );
};

export default ClearButton;

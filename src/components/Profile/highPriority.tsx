import { useStore } from "@/store/store";
import { StyleSheet, View, Text } from "react-native";

const HighPriorityCard = () => {
  const { items, clearPurchasedList } = useStore();
  const highPriorityItems = items.filter((item) => item.priority === "High");
  return (
    <View style={styles.container}>
      <View style={styles.tilte}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          High Priority Remains
        </Text>
        <View style={styles.action}>
          <Text
            style={{
              color: "#ffffff",
              textTransform: "uppercase",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Action
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 30, fontWeight: 500 }}>
          {highPriorityItems.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffdbbf",
  },
  tilte: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    paddingInline: 8,
    paddingBlock: 6,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: "red",
  },
});

export default HighPriorityCard;

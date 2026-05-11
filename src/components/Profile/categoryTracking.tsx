import { useStore } from "@/store/store";
import { View, Text, StyleSheet } from "react-native";

const CategoryColors: Record<string, string> = {
  Dairy: "#8F00FF",
  Pantry: "#FFD300",
  Produce: "#AD0000",
  Food: "#7FFFD4",
  Snacks: "#000080",
  Bakery: "#FF5F1F",
};

const CategoryTracking = () => {
  const { items } = useStore();
  const totalItems = items.length;
  const categories = items.reduce<Record<string, number>>((arr, item) => {
    arr[item.category] = (arr[item.category] ?? 0) + 1;
    return arr;
  }, {});

  const entries = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  return (
    <View style={styles.container}>
      {/*Title*/}
      <View style={styles.tilte}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          Items by category
        </Text>
        <Text
          style={{
            color: "gray",
            fontWeight: 700,
          }}
        >
          {entries.length} Groups
        </Text>
      </View>

      {/*Main section*/}
      {entries.map(([category, cnt]) => {
        const widthVar = totalItems
          ? Math.max(10, Math.round((cnt / totalItems) * 100))
          : 0;
        return (
          <View key={category} style={styles.mainSection}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Text style={{ fontWeight: 400, fontSize: 15 }}>{category}</Text>
              <Text>{cnt}</Text>
            </View>
            {/*Bar*/}
            <View style={styles.bar}>
              <View
                style={{
                  height: 10,
                  width: `${widthVar}%`,
                  backgroundColor: CategoryColors[category] ?? "#8aa397",
                  borderRadius: 20,
                }}
              ></View>
            </View>
          </View>
        );
      })}
      {entries.length === 0 ? (
        <View
          style={{
            marginTop: 3,
            paddingInline: 7,
            paddingBlock: 6,
            backgroundColor: "gray",
          }}
        >
          <Text>Add items to reveal your category mix.</Text>
        </View>
      ) : null}
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
  },
  mainSection: {
    marginTop: 5,
  },
  bar: {
    marginTop: 5,
    backgroundColor: "#ffffff",
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default CategoryTracking;

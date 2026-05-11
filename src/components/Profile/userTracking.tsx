import { useStore } from "@/store/store";
import { View, Text, Pressable, StyleSheet } from "react-native";
import BottomCard from "../HeroBottomCard";

const UserTracker = () => {
  const { items } = useStore();
  const total = items.length;
  const completedCount = items.filter(item => item.purchased);
  const pendingCount = items.length - completedCount.length;
  const completedPercentage = items.length ? Math.round((completedCount.length / items.length) * 100) : 0;
  
  return (
    <View>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap:15
      }}>
        <BottomCard name="Pending" quantity={pendingCount} />
        <BottomCard name="Completed" quantity={completedCount.length} />
        <BottomCard name="Total" quantity={total} />
      </View>
      {/*Progress bar*/}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressTitle}>
          <Text style={{
            fontWeight: 500,
            fontSize:15
          }}>Completion rate</Text>
          <Text style={{
            color: "gray",
            fontWeight:700
          }}>{completedPercentage}%</Text>
        </View>
        <View style={{
          marginTop:10,
          borderWidth: 1,
          borderRadius: 20,
          width: "100%",
          backgroundColor:`#ffffff`
        }}>
          <View
            style={{
              width: `${completedPercentage}%`,
              backgroundColor: "gray",
              height: 10,
              borderRadius:20
            }}
          >
            
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop:20,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#ffdbbf",
  },
  progressTitle: {
    justifyContent: "space-between",
    flexDirection:"row"
  }
})

export default UserTracker;
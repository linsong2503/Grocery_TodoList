import { useStore } from "@/store/store";
import { StyleSheet, View ,Text} from "react-native";

const HeroCard = () => {
  const { items } = useStore();
  const completedCount = items.filter(item => item.purchased);
  const pendingCount = items.length - completedCount.length;
  const completedPercentage = items.length ? Math.round((completedCount.length / items.length) * 100) : 0;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Today</Text>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>Your Board</Text>
        </View>
        <Text style={styles.subText}>{`${pendingCount}`} pending . {`${completedCount.length}`} completed</Text>
        {/*Progress bar*/}
        <View style={styles.progressBar}>
          <View style={{
            height: 10,
            backgroundColor: "gray",
            borderRadius: 25,
            width:`${completedPercentage}%` 
          }} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    padding:20,
    backgroundColor: "#550070",
    borderRadius:20
  },
  title: {
    color: "pink",
    fontSize: 20,
    textTransform: "uppercase",
  },
  mainTextContainer: {
    marginTop: 5,
    marginBottom:5,
  },
  mainText: {
    color: "white",
    fontWeight: 400,
    fontSize:35,
  },
  subText: {
    color: "pink",
    fontSize:15
  },
  progressBar: {
    marginTop:10,
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 25,
  },
  progress: {
    height: 10,
    backgroundColor: "gray",
    borderRadius: 25,
  }
})

export default HeroCard;
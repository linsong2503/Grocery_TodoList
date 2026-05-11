import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { useStore } from "@/store/store";
import TabScreenCircle from '@/components/tabScreenCircle'
import { FontAwesome6} from "@expo/vector-icons";
import BottomCard from "@/components/HeroBottomCard";
import { useState } from "react";
import PlanForm from "@/components/planForm";

const PlanPage = () => {
  const { items } = useStore();

  const pendingItems = items.filter((item) => !item.purchased);
  const highPriorityItems = items.filter((item) => item.priority === "High");
  const totalItems = items.filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  const [itemNames, setItemNames] = useState("");
  const [quantity, setQuantity] = useState("1"); 

  const handleQuantityChange = (value: string) => {
      setQuantity(value.replace(/[^0-9]/g, ""));
    };
  
  
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding:20,gap:14}}
      contentInsetAdjustmentBehavior="automatic"
    >
      <TabScreenCircle/>
      {/*Hero Card*/}
      <View style={styles.heroContainer}>
        {/*Top*/}
        <View style={styles.heroTopContainer}>
          <View style={styles.text}>
            <Text style={styles.title}>Your Plan</Text>
            <Text style={styles.mainText}>Plan smarter, shop easier </Text>
            <Text style={styles.subText}>Keep everything you buy in a planned space</Text>
          </View>
          <View style={styles.rightIcon}>
            <FontAwesome6 name="wand-magic-sparkles" size={20} color={"white"} />
          </View>
        </View>
        {/*Bottom*/}
        <View style={styles.heroBottomContainer}>
          <BottomCard name="Pending" quantity={pendingItems.length}/>
          <BottomCard  name="High Priority" quantity={highPriorityItems.length}/>
           <BottomCard name="Total" quantity={totalItems}/>
        </View>
      </View>
      {/*Main Section*/}
      <View style={styles.mainSection}>
        <Text style={{fontSize:20, marginBottom:5,color:"blue"}}>Start building your own list</Text>
        <Text style={{ fontSize: 15, color:"blue" }}>Add items to your list with the right quantity, category and urgency</Text>
        {/*Form*/}
        <View style={styles.formContainer}>
            <PlanForm/>
        </View>
      </View>
  </ScrollView>)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2e2c4",
    paddingBlock:4,
  },
  heroContainer: {
    backgroundColor: "#ffdbbf",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    borderWidth:1
  },
  heroTopContainer: {
    marginTop:6,
    flexDirection: "row",
  },
  heroBottomContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  text: {
    gap:8
  },
  title: {
    textTransform: "uppercase",
    fontSize:18
  },
  mainText: {
    fontSize: 25,
    fontWeight: 600,
  },
  subText: {
    fontSize:15
  },
  rightIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#59a836",
    width: 30,
    height:30,
    borderRadius:10
  },
  mainSection: {
    marginTop:15
  },
  formContainer: {
    marginTop:20,
    borderWidth: 1.5,
    borderRadius:15,
    padding: 15,
    backgroundColor: "#ffdbbf",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingInline: 7,
    paddingBlock: 6,
    marginBottom: 10,
    
  },
  input: {
    marginTop:5,
    borderWidth: 1,
    borderRadius: 10,
    padding:5,
    flex: 1,
    paddingInline: 25,
    paddingBlock: 10,
    
  },
  input_title: {
    fontWeight: 400,
    fontSize:15
  },
  icon: {
    position: "absolute",
    marginLeft: 15,
    marginTop:5
  },
  category: {
  }
})

export default PlanPage;


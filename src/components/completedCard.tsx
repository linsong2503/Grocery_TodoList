import { View, Text, StyleSheet, Pressable } from "react-native";
import { useStore } from "@/store/store";
import {FontAwesome, FontAwesome6 } from "@expo/vector-icons";

const CompletedCard = () => {
  const { deleteItem,togglePurchased,items } = useStore();
  const completedItems = items.filter(item => item.purchased);
  if (!completedItems.length) return null;  
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Completed</Text>
        {
          completedItems.map((item) => (
            <View key={item.id}
              style={styles.productBox}
            >
              <View style={styles.product}>
                <Pressable
                  onPress={ () => {
                     togglePurchased(item.id)
                  }}
                  style={styles.checkBox}
                >
                  <FontAwesome6 name="check" size={12} color={"white"} />
                </Pressable>
                <Text>{item.name}</Text>
              </View>
              
              {/*Right*/}
              <View style={styles.deleteBox}>
                <Pressable style={styles.trash}
                  onPress={()=>deleteItem(item.id)}
                >
                  <FontAwesome name="trash" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          ))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor:""
  },
  subContainer: {
    gap: 5,
    marginBottom:10
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    textTransform:"uppercase"
  },
  productBox: {
    justifyContent: "space-between",
    alignItems:"center",
    marginTop: 10,
    flexDirection: "row",
    paddingInline: 8,
    paddingBlock: 7,
    backgroundColor: "#f0b384",
    borderRadius:20
    },
  product: {
    flexDirection: "row",
    gap:10
  },
  checkBox: {
    height: 20,
    width: 20,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:40
  },
  deleteBox: {
    marginRight:5
  },
  trash: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 10,
  },
})

export default CompletedCard;
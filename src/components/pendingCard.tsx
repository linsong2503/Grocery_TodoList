import { GroceryItem, useStore } from "@/store/store";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { FontAwesome,FontAwesome6} from "@expo/vector-icons";


const priorityColor = {
  low: "#59a836",
  medium: "#ffdd4b",
  high: "#fc5365"
}

const priorityTextColor = {
  low: "#FFFFFF",
  medium: "#2D2D2D",
  high:"#FFFFFF"
}


const PendingCard = ({ item }: { item: GroceryItem }) => {
  const {updateQuantity,togglePurchased,deleteItem} = useStore()
  return (
    <View style={styles.container}>
      {/*Radio Button*/}
      <View style={styles.subContainer}>
        <Pressable style={styles.radioButton} onPress={() => togglePurchased(item.id)}></Pressable>
        {/*Main Section*/}
        
        <View style={styles.mainSection}>
          {/*Left*/}
          <View>
            <Text style={styles.name}>
              {item.name}
            </Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>
                {item.category}
              </Text>
            </View>
            <View style={styles.quantity}>
              <Pressable style={styles.quantityButton}
                onPress={()=> updateQuantity(item.id,Math.max(1,item.quantity-1))}
              >
                <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
              </Pressable>
              <Text>{item.quantity}</Text>
              <Pressable style={styles.quantityButton}
                onPress={()=>updateQuantity(item.id,Math.max(1,item.quantity+1))}
              >
                <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
              </Pressable>
            </View>
          </View>
          {/*Right*/}
          <View style={styles.right}>
            <View style={{ borderRadius: 20,
            borderWidth: 1,
            height: 25,
            width: 70,
            alignItems: "center",
            paddingInline: 3,
            paddingBlock: 1,
            backgroundColor:`${priorityColor[item.priority]}`
            }}>
              <Text style={{
                color: `${priorityTextColor[item.priority]}`,
                fontWeight: 400,
                fontSize:15
              }}>{item.priority}</Text>
            </View>
            <View>
              <Pressable style={styles.trash}
                onPress={()=>deleteItem(item.id)}
              >
                <FontAwesome name="trash" size={20} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "#ffdbbf",
    padding: 4,
    borderWidth: 1,
  },
  subContainer: {
    display: "flex",
    padding:5,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    width:"100%"
  },
  radioButton: {
    height: 24,
    width: 24,
    backgroundColor: '#ffc5af',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginLeft: 10,
    marginTop:5
  },
  mainSection: {
    flex:1,
    flexDirection:"row",
    justifyContent: "space-between",
    gap:5,
  },
  right: {
    flexDirection: "row",
    gap: 15,
    marginRight: 10,
  },
  name: {
    color: "black",
    fontSize: 20,
    fontWeight:400
  },
  categoryContainer: {
    backgroundColor: "#B988B7",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop:4,
    marginBottom:4
  },
  categoryText: {
    fontSize: 15,
    color: "white",
    fontWeight:300
  },
  trash: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  quantity: {
    marginTop:5,
    display: "flex",
    gap:5,
    flexDirection: "row",
    alignItems:"center"
  },
  quantityButton: {
    backgroundColor: "#ffc5af",
    borderRadius: 8,
    borderWidth: 1,
    padding: 3,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent:"center"
  }
})

export default PendingCard;
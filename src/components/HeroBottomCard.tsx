import { StyleSheet, View,Text } from "react-native"

const BottomCard = ({name,quantity}:{name:string,quantity:number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    marginTop: 15,
    backgroundColor: "#ffc5af",
    
  },
  subContainer: {
    padding:5,
    gap: 5,
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: 300,
    color: "red",
    textTransform: "uppercase",
  },
  
  quantity: {
    fontSize: 25,
    fontWeight:400
  },
  
})

export default BottomCard;


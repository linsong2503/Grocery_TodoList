import { StyleSheet, View } from "react-native";

const TabScreenCircle = () => {
  return (
    <>
      <View style={styles.leftCircle} pointerEvents="none"/>
      <View style={styles.rightCircle} pointerEvents="none"/>
   </>
  )
}

const styles = StyleSheet.create({
  leftCircle: {
    position: 'absolute',
    left: -94,     
    top: -10,       
    height: 200,   
    width: 200,    
    borderRadius: 150, 
    backgroundColor:"#B988B7"
  },
  rightCircle: {
    position: 'absolute',
    right: -94,     
    top: 58,       
    height: 200,   
    width: 200,    
    borderRadius: 112, 
    backgroundColor:"#B988B7"
  }
  
})



export default TabScreenCircle;

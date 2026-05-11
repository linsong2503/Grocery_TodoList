import { useClerk, useUser } from "@clerk/expo";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View, StyleSheet } from "react-native";

const UserProfile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  
const email = user?.primaryEmailAddress?.emailAddress;
const userName = user?.fullName || email?.split("@")[0];
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/*User Avatar*/}
        <View style={styles.userImageContainer}>
            <Image source={{uri:user?.imageUrl}} style={{ width: "100%", height: "100%" }} />
        </View>
        <View style={{gap:5 , flex:1}}>
          <Text style={{textTransform:"uppercase", color:"gray",fontWeight:400}}>Signed in as</Text>
          <Text style={{fontWeight:500, fontSize:20}}>{userName}</Text>
          <Text style={{fontSize:15, color:"gray",fontWeight:400}}>{email}</Text>
        </View>
        <Pressable
          onPress={()=>signOut()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "red",
            width: 45,
            height: 45,
            borderRadius:15
          }}
        >
          <FontAwesome6 name={"arrow-right-from-bracket"} size={15} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#ffdbbf",
    padding:10,
  },
  subContainer: {
    paddingInline: 11,
    paddingBlock: 10,
    flexDirection: "row",
    gap:10,
  },
  userImageContainer: {
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
  }
})

export default UserProfile;
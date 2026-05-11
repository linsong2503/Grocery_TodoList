import useSocialAuth from '@/hooks/useSocialAuth'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

export default function SignInScreen() {
  const { handleSocialAuth, loading } = useSocialAuth();
  
  const isGoogleClicked = loading === "oauth_google";
  const isAppleClicked = loading === "oauth_apple";

  const isLoading = isAppleClicked || isGoogleClicked;

  
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.leftBackgroundCircle} />
      <View style={styles.rightBackgroundCircle} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hearderText}>
           Grocery
        </Text>
        <Text style={styles.headerSubText}>
          We bring the store to your door
        </Text>
        <View style={styles.hero_section}>
          <Image
            source={require("../../../assets/images/hero_img.png")}
            style={{ width: "100%", height: 250 }}
            contentFit="fill"
          />
        </View>
      </View>
      
      {/*Auth view*/}
      <View style={styles.auth_card}>
        <View style={styles.auth_header}>
          <Text style={styles.auth_headerText}>
            WELCOME BACK
          </Text>
        </View>
        <Text style={styles.auth_subText}>
          We help you give fresh food items in your door very fast so just order your desire products
        </Text>
        <View style={styles.auth_container}>
          <Pressable
            style={({ pressed }) => [
                styles.button,
                isLoading && styles.loading,
                pressed && styles.pressed
              ]}
            disabled={isLoading}
            onPress={()=>handleSocialAuth("oauth_google")}
          >
                <View style={styles.icon}>
                  <Image
                    source={require("../../../assets/images/google.png")}
                    style={{ width:20, height: 20 }}
                  />
                </View>
                <Text style={styles.auth_text}>
                  {isGoogleClicked ? "Connecting Google..." : "Continue with Google"}
                </Text>
                 <FontAwesome name="angle-right" size={20} color="white"/>
          </Pressable>
          {/* Apple */}
          <Pressable
            style={({ pressed }) => [
                styles.button,
                isLoading && styles.loading,
                pressed && styles.pressed
              ]}
            disabled={isLoading}
            onPress={()=>handleSocialAuth("oauth_google")}
          >
            <View style={styles.icon}>
              <FontAwesome6 name="apple" size={23} />
            </View>
            <Text style={styles.auth_text}>
              { isAppleClicked ? "Connecting Apple..." : "Continue with Apple"}
            </Text>
            <FontAwesome name="angle-right" size={20} color="white" />
         </Pressable>
        </View>
        <Text style={styles.policyText}>
        By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink"
  },
  leftBackgroundCircle: {
    position: 'absolute',
    left: -64,     
    top: 68,       
    height: 150,   
    width: 150,    
    borderRadius: 112, 
    backgroundColor:"#B988B7"
  },
  rightBackgroundCircle: {
    position: 'absolute',
    right: -74,     
    top: 148,       
    height: 170,   
    width: 170,    
    borderRadius: 112, 
    backgroundColor:"#B988B7"
  },
  header: {
    paddingInline: 150,
    paddingTop: 16, 
    alignItems:"center"
  },
  hearderText: {
    textAlign: "center",
    fontSize: 40,
    width: 200,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  headerSubText: {
    marginTop: 5,
    textAlign: "center",
    width: 250,
  },
  hero_section: {
    marginTop: 26,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    width: 350,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    opacity: 0.6
  },
  auth_card: {
    marginTop: 32,
    backgroundColor: "#B988B7",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingInline: 24,
    flex: 1,
    paddingTop: 24,
    paddingBottom: 32,
  },
  auth_header: {
    alignSelf: "center",
    paddingInline: 12,
    paddingBlock: 4,
    borderRadius: 40,
    backgroundColor: "pink",
  },
  auth_headerText: {
    fontSize:18
  },
  auth_subText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,

  },
  auth_container: {
    marginTop:28
  },
  loading: {
      opacity: 0.7,
    },
    pressed: {
      opacity: 0.9, 
  },
  button: {
    marginBottom: 12,        
    height: 56,              
    flexDirection: 'row',    
    alignItems: 'center',    
    borderRadius: 16,        
    borderWidth: 1,         
    borderColor: '#fff',     
    backgroundColor: '', 
    paddingHorizontal: 16,   
  },
  icon: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius:20,
    alignItems: "center",
    justifyContent:"center"
  },
  auth_text: {
    marginLeft: 15,
    color: "white",
    fontSize: 17,
    fontWeight: 600,
    flex:1
  }
  ,
  policyText: {
    marginTop: 10,
    textAlign:"center",
    fontSize: 13,
  },
})
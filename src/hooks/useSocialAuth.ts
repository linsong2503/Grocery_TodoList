import { useSSO } from "@clerk/expo";
import { Alert } from "react-native";
import { useState } from "react";

const useSocialAuth = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();
  
  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    if (loading) return;
    setLoading(strategy);
    
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        Alert.alert("Sign-in unsuccessfully", "Please try again");
        return;
      }
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Errors occur:", error);
      Alert.alert("Failed to sign-in, please try again!");
    }
    finally {
      setLoading(null);
    }  
  };
  return { handleSocialAuth, loading };
}

export default useSocialAuth;
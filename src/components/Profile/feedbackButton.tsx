import { FontAwesome6 } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FeedbackButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        right: 16,
        zIndex: 50,
        bottom: insets.bottom + 90,
      }}
    >
      <Pressable
        onPress={() => Sentry.showFeedbackWidget()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
          backgroundColor: "gray",
          paddingInline: 7,
          paddingBlock: 6,
          borderRadius: 15,
        }}
      >
        <FontAwesome6 name="comment-dots" size={14} color="hsl(136 42% 92%)" />
        <Text style={{}}>Feedback</Text>
      </Pressable>
    </View>
  );
};
export default FeedbackButton;

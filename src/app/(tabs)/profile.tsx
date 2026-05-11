import { StyleSheet, ScrollView } from "react-native";
import TabScreenCircle from "@/components/tabScreenCircle";
import UserProfile from "@/components/Profile/userProfile";
import UserTracker from "@/components/Profile/userTracking";
import CategoryTracking from "@/components/Profile/categoryTracking";
import HighPriorityCard from "@/components/Profile/highPriority";
import ClearButton from "@/components/Profile/clearButton";
import FeedbackButton from "@/components/Profile/feedbackButton";
const profile = () => {
  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TabScreenCircle />
        <UserProfile />
        <UserTracker />
        <CategoryTracking />
        <HighPriorityCard />
        <ClearButton />
      </ScrollView>
      <FeedbackButton />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBlock: 4,
    backgroundColor: "#f2e2c4",
  },
});

export default profile;

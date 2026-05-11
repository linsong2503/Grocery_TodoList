import TabScreenCircle from '@/components/tabScreenCircle'
import HeroCard from '@/components/heroCard'
import { useStore } from '@/store/store'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import PendingCard from '@/components/pendingCard'
import CompletedCard from '@/components/completedCard'
import { FlatList } from 'react-native'

export default function ListPage() {

  const { items } = useStore();
  const pendingItems = items.filter(item => !item.purchased);

  return (
      <FlatList
        data={pendingItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PendingCard item={item} />}
        contentContainerStyle={{ padding: 20, gap: 10 }}
        contentInsetAdjustmentBehavior='automatic'
        style={styles.container}
        ListHeaderComponent={
          <View style={{gap:14}}> 
            <TabScreenCircle />
            <HeroCard />
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionText}>Shopping Items</Text>
              <Text style={styles.mainSectionText_2}>{`${pendingItems.length}`} active</Text>
            </View>
          </View>
        }
        ListFooterComponent={
           <CompletedCard/>
        }
      />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2e2c4",
    flex:1
  },
  mainSection: {
    display: "flex",
    flexDirection: "row",
    paddingInline: 4,
    justifyContent:"space-between",
    alignItems: "center",
    marginBottom:15
  },
  mainSectionText: {
    textTransform: "uppercase",
    width: "40%",
    color:"blue"
  },
  mainSectionText_2: {
    color: "blue",
  }
})
import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import { NativeTabs } from 'expo-router/build/native-tabs'
import { useStore } from '@/store/store'
import { useEffect } from 'react';

export default function Layout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { loadItems, items } = useStore();
  
  useEffect(() => {
    loadItems();
  },[])

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }
  
  return (
    <NativeTabs tintColor={"purple"}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={
          {
            default: "list.bullet.circle",
            selected:"list.bullet.circle.fill"
          }
        } md="list" />
        </NativeTabs.Trigger>
      <NativeTabs.Trigger name="plan">
        <NativeTabs.Trigger.Icon sf={{
          default: "plus.circle",
          selected:"plus.circle.fill"}} md="add" />
        <NativeTabs.Trigger.Label>Plan</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger> 
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf={{
          default: "person",
          selected:"person.fill"
        }} md="person" />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger> 
    </NativeTabs>
  )
}
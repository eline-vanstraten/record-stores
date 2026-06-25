import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecordStoresList from './src/screens/RecordStoresList.js';
import Map from './src/screens/Map.js';
import Favorites from './src/screens/Favorites.js';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="StoreList" component={RecordStoresList} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

export default function App() {


  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeAreaView}>

        <MyTabs />
    

      </SafeAreaView>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

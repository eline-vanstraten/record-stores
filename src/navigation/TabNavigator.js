import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Map from "../screens/Map"
import HomeScreen from "../screens/HomeScreen"
import Favorites from "../screens/Favorites"
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecordStoresDetail from "../screens/stores/RecordStoresDetail";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeStackScreen(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Stores" component={HomeScreen}/>
            <Stack.Screen name="StoreDetail" component={RecordStoresDetail}/>
        </Stack.Navigator>
    )
}

export default function TabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                },
                tabBarActiveTintColor: "#620000",
                tabBarInactiveTintColor: "#0c0c0c",
                headerStyle: {
                    backgroundColor: "#FFFFFF"
                },
                headerTitle: "RecordRadar",
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => console.log("Instellingen geopend")} style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={24} color="#0c0c0c"></Ionicons>
                    </TouchableOpacity>
                )
            }}
        >
            <Tab.Screen name="Stores" component={HomeStackScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color}></Ionicons>
                )
            }} />
            <Tab.Screen name="Map" component={Map} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "map" : "map-outline"} size={size} color={color}></Ionicons>
                )
            }} />
            <Tab.Screen name="Favorites" component={Favorites} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "star" : "star-outline"} size={size} color={color}></Ionicons>
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    settingsButton: {
        marginRight: 16,
        padding: 4
    }
})
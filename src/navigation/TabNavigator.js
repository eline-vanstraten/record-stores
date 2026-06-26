import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Map from "../screens/Map"
import HomeScreen from "../screens/HomeScreen"
import Favorites from "../screens/Favorites"
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecordStoresDetail from "../screens/stores/RecordStoresDetail";

const NavigationTab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const FavoriteStack = createStackNavigator()

function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Stores" component={HomeScreen} />
            <HomeStack.Screen name="StoreDetail" component={RecordStoresDetail} />
        </HomeStack.Navigator>
    )
}

function FavoriteStackScreen() {
    return (
        <FavoriteStack.Navigator screenOptions={{ headerShown: false }}>
            <FavoriteStack.Screen name="FavoritesList" component={Favorites}/>
            <FavoriteStack.Screen name="StoreDetail" component={RecordStoresDetail} />
        </FavoriteStack.Navigator>
    )
}

export default function TabNavigator() {

    return (
        <NavigationTab.Navigator
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
            <NavigationTab.Screen name="Stores" component={HomeStackScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color}></Ionicons>
                )
            }} />
            <NavigationTab.Screen name="Map" component={Map} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "map" : "map-outline"} size={size} color={color}></Ionicons>
                )
            }} />
            <NavigationTab.Screen name="Favorites" component={FavoriteStackScreen} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Ionicons name={focused ? "star" : "star-outline"} size={size} color={color}></Ionicons>
                )
            }} />
        </NavigationTab.Navigator>
    )
}

const styles = StyleSheet.create({
    settingsButton: {
        marginRight: 16,
        padding: 4
    }
})
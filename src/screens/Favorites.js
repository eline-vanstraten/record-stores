import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import RecordStoresDetail from "./stores/RecordStoresDetail";
import RecordStoresList from "./stores/RecordStoresList";
import RecordStoresListItem from "./stores/RecordStoresListItem";
import { useIsFocused } from "@react-navigation/native";
import { FetchAPI } from "../services/Fetch";
import { useLayout } from "../contexts/LayoutContext"

export default function Favorites() {

    const [favoriteStores, setFavoriteStores] = useState([]);
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused()

    //dark mode
    const { isDarkMode } = useLayout()
    const styles = getStyles(isDarkMode)

    useEffect(() => {
        if (isFocused) {
            getFavorites()
        }

    }, [isFocused])

    async function getFavorites() {
        setLoading(true);
        try {

            const savedFavorites = await AsyncStorage.getItem('@favorite_stores')
            const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : []

            if (favoriteIds.length === 0) {
                setFavoriteStores([])
                setLoading(false)
                return;
            }

            const allStores = await FetchAPI()

            //alleen de stores die favoriet zijn blijven over
            const filteredStores = allStores.filter(store =>
                favoriteIds.includes(store.id.toString()))

            setFavoriteStores(filteredStores);
            setLoading(false)

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
        }
    }

    async function removeFavorite(storeId) {
        try {
            const savedFavorites = await AsyncStorage.getItem('@favorite_stores')
            let favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : []

            //haalt store uit de lijst
            favoriteIds = favoriteIds.filter(id => id !== storeId.toString())
            await AsyncStorage.setItem('@favorite_stores', JSON.stringify(favoriteIds))

           await getFavorites()

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
        }
    }


    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={isDarkMode ? "#F57474" : "#620000"}></ActivityIndicator>
                <Text style={{ marginTop: 10, color: isDarkMode ? "#F57474" : "#620000"}}>Favorites loading...</Text>
            </View>
        )
    }

    if (favoriteStores.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={{ marginTop: 10, color: isDarkMode ? "#F57474" : "#620000"}}>No favorite stores yet.</Text>
            </View>
        )
    }





    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteStores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                (<RecordStoresListItem
                    store={item}
                    isFavorite={true}
                    onFavoritePress={() => removeFavorite(item.id)} />)

                }
            />

        </View>
    )
}

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? "#620000" : "#F57474",
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
});

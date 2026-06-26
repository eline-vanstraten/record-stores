import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecordStoresListItem from "./RecordStoresListItem";
import { useIsFocused } from "@react-navigation/native";
import { FetchAPI } from "../../services/Fetch";

export default function RecordStoresList() {

    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState([])
    const isFocused = useIsFocused()

    //laad pagina opnieuw zodra er naar genavigeerd wordt zodat aanpassingen meteen doorgevoerd worden
    useEffect(() => {
        loadFavorites()
    }, [isFocused])


    useEffect(() => {
        getStores()
    }, []);


    //favorite store
    async function loadFavorites() {
        try {
            const savedFavorites = await AsyncStorage.getItem('@favorite_stores')
            if (savedFavorites !== null) {
                //omzetten naar javascript array
                setFavorites(JSON.parse(savedFavorites))
            }

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
        }

    }

    async function changeFavorite(storeId) {
        let updatedFavorites = [...favorites]
        const idString = storeId.toString()

        if (updatedFavorites.includes(idString)) {
            //als store er al in stond eruit halen
            updatedFavorites = updatedFavorites.filter(id => id !== idString)
        } else {
            //store toevoegen
            updatedFavorites.push(idString)
        }

        setFavorites(updatedFavorites)

        try {
            await AsyncStorage.setItem('@favorite_stores', JSON.stringify(updatedFavorites))
        } catch (error) {
            console.error("Er is een fout opgetreden", error);
        }
    }


    async function getStores() {
        setLoading(true)
        try {

            const data = await FetchAPI()

            console.log(data);

            setStores(data);
            setLoading(false)

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
            setLoading(false);
        }

    }

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#620000"></ActivityIndicator>
                <Text style={{ marginTop: 10, color: "#620000" }}>Record Stores loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={stores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                (<RecordStoresListItem
                    store={item}
                    isFavorite={favorites.includes(item.id.toString())}
                    onFavoritePress={() => changeFavorite(item.id)} />)

                }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F57474",
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
});

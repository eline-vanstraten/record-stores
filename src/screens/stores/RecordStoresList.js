import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import RecordStoresDetail from "./RecordStoresListItem";

export default function RecordStoresList() {

    const url = "http://stud.hosted.hr.nl/1096534/record-stores.json"
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStores()
    }, []);

    async function getStores() {
        setLoading(true)
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "x-delay-ms": "2000"
                }
            }
            )

            const data = await response.json()

            console.log(data);

            setStores(data);
            setLoading(false)

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
            setLoading(false);

        }


    }

    if(loading){
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#620000"></ActivityIndicator>
                <Text style={{marginTop: 10, color: "#620000"}}>Record Stores loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={stores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    (<RecordStoresDetail store={item} />)

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

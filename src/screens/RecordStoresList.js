import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function RecordStoresList() {

    const url = "http://stud.hosted.hr.nl/1096534/record-stores.json"
    const [stores, setStores] = useState([]);

    useEffect(() => {
        getStores()
    }, []);

    async function getStores() {
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

        } catch (error) {
            console.error("Er is een fout opgetreden", error);

        }


    }

    return (
        <View style={styles.container}>
             <CustomButton onPress={() => console.log('Knop ingedrukt!')}>Press</CustomButton>
            <FlatList
                data={stores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    (<Text>{item.name}</Text>)

                }
            />

          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

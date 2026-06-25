import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";

export default function RecordStoresDetail({ route }) {

    const url = "http://stud.hosted.hr.nl/1096534/record-stores.json"
    const [selectedStore, setSelectedStore] = useState(null)
    const [loading, setLoading] = useState(true)

    const { storeId } = route.params

    useEffect(() => {
        getStoreDetail()
    }, [storeId])

    async function getStoreDetail() {
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
            const store = data.find(item => item.id === storeId)

            setSelectedStore(store);
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
                <Text style={styles.text}>Record Store loading...</Text>
            </View>
        )
    }


    if (!selectedStore) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.text}>Store not found.</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, styles.center]}>
            <View style={styles.background}>

                <Text style={styles.titleText}>{selectedStore.name}</Text>
                <Text style={styles.typeText}>{selectedStore.type}</Text>

                <View style={styles.divider} />

                <Text style={styles.title}>Address:</Text>
                <Text style={styles.text}>{selectedStore.address}</Text>

                <View style={styles.divider} />

                <Text style={styles.title}>Opening hours:</Text>
                <View style={styles.hoursContainer}>
                    {/* opvangen wanneer openingstijden leeg zijn */}
                    {selectedStore.hours && selectedStore.hours.length > 0 ? (
                        selectedStore.hours.map((openingTime, index) => (
                            <Text key={index} style={styles.text}>
                                {openingTime.day}: {openingTime.hours || "Closed"}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.text}>No opening hours available.</Text>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton>Find on the map</CustomButton>
                </View>
            </View>
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
    },
    background: {
        backgroundColor: "#ffc1c1",
        width: "90%",
        maxWidth: 360,
        borderRadius: 2,
        padding: 24,
        alignItems: "center",
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#620000",
        textAlign: "center",
        marginBottom: 4
    },
    typeText: {
        fontSize: 18,
        color: "#0c0c0c",
        fontStyle: "italic",
        marginBottom: 12
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#EBEBEB",
        marginVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0c0c0c",
        alignSelf: "flex-start",
    },
    text: {
        fontSize: 15,
        color: "#0c0c0c",
        alignSelf: "flex-start",
    },
    hoursContainer: {
        width: "100%",
        marginBottom: 16
    },
    buttonContainer: {
        width: "100%",
        marginTop: 8
    }

});

import { use, useEffect, useState } from "react";
import { ActivityIndicator, Share, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { FetchAPI } from "../../services/Fetch";
import { useLayout } from "../../contexts/LayoutContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecordStoresDetail({ route }) {
    const [selectedStore, setSelectedStore] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)

    //darkmode
    const { isDarkMode } = useLayout()
    const styles = getStyles(isDarkMode)

    const { storeId } = route?.params || {}

    const navigation = useNavigation()

    useEffect(() => {
        if (storeId) {
            getStoreDetail()
        } else {
            setLoading(false)
        }

    }, [storeId])

    async function getStoreDetail() {
        setLoading(true)
        try {

            const data = await FetchAPI()
            const store = data.find(item => item.id === storeId)

            const savedFavorites = await AsyncStorage.getItem('@favorite_stores')

            if (savedFavorites !== null) {
                const favoriteIds = JSON.parse(savedFavorites)
                setIsFavorite(favoriteIds.includes(storeId.toString()))
            }

            setSelectedStore(store);
            setLoading(false)

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
            setLoading(false);

        }
    }

    async function shareStoreDetails() {
        if (!selectedStore) return

        try {
            const statusText = isFavorite ? "This is my favorite hotspot" : "Look at this hotspot"
            const message = `${statusText}. ${selectedStore.type}: ${selectedStore.name}. Address: ${selectedStore.address} `

            await Share.share({
                message: message,
                title: selectedStore.name
            })
        } catch (error) {
            console.error("Er is een fout opgetreden", error);
        }
    }

    async function findOnMap() {
        if (selectedStore) {
            navigation.navigate("Map", {
                storeLatitude: selectedStore.latitude,
                storeLongitude: selectedStore.longitude
            })
        }
    }

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={isDarkMode ? "#F57474" : "#620000"}></ActivityIndicator>
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

    if (!storeId) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.text}>First chose a store from the home screen.</Text>
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
                    <CustomButton onPress={findOnMap}>Find on the map</CustomButton>

                    <View style={{ marginTop: 10 }}>
                        <CustomButton onPress={shareStoreDetails}>Share hotspot</CustomButton>
                    </View>

                </View>
            </View>
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
    },
    background: {
        backgroundColor: isDarkMode ? "#753333" : "#ffc1c1",
        width: "90%",
        maxWidth: 360,
        borderRadius: 2,
        padding: 24,
        alignItems: "center",
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: isDarkMode ? "#F57474" : "#620000",
        textAlign: "center",
        marginBottom: 4
    },
    typeText: {
        fontSize: 18,
        color: isDarkMode ? "#FFFFFF" : "#0c0c0c",
        fontStyle: "italic",
        marginBottom: 12
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: isDarkMode ? "#FFFFFF" : "#0c0c0c",
        marginVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: isDarkMode ? "#FFFFFF" : "#0c0c0c",
        alignSelf: "flex-start",
    },
    text: {
        fontSize: 15,
        color: isDarkMode ? "#FFFFFF" : "#0c0c0c",
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

import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../contexts/LayoutContext";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { FetchAPI } from "../services/Fetch";

export default function Map() {

    //darkmode
    const { isDarkMode } = useLayout()
    const styles = getStyles(isDarkMode)

    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [recordStores, setRecordStores] = useState([])

    const [userLocation, setUserLocation] = useState(null)

    useEffect(() => {

        startWatchingLocation()
        getRecordStores()

    }, [])

    async function startWatchingLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            setErrorMessage('Access to location is denied.')
            return
        }

        try {

            let currentLoc = await Location.getCurrentPositionAsync({})

            setUserLocation({
                latitude: currentLoc.coords.latitude,
                longitude: currentLoc.coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            })

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
        }




    }

    async function getRecordStores() {
        setLoading(true)
        try {

            const data = await FetchAPI()

            setRecordStores(data)
            setLoading(false)

        } catch (error) {
            console.error("Er is een fout opgetreden", error);
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                userInterfaceStyle={isDarkMode ? "dark" : "light"}
                initialRegion={userLocation}>
                {!loading && recordStores.map((store) => (
                    <Marker
                        key={`${store.id}-${isDarkMode}`}
                        coordinate={{
                            latitude: store.latitude,
                            longitude: store.longitude
                        }}
                        title={store.name}
                        description={store.address}
                        pinColor={isDarkMode ? "#620000" : "#F57474"} />
                ))}
            </MapView>

            {errorMessage && <Text style={{ marginTop: 10, color: isDarkMode ? "#F57474" : "#620000" }}>{errorMessage}</Text>}
        </View>
    )
}

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? "#620000" : "#F57474",
    },
    map: {
        width: "100%",
        height: "100%"
    }
});

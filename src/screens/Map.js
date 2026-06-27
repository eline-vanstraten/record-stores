import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../contexts/LayoutContext";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from "react";
import { FetchAPI } from "../services/Fetch";

export default function Map({ route }) {

    //darkmode
    const { isDarkMode } = useLayout()
    const styles = getStyles(isDarkMode)

    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [recordStores, setRecordStores] = useState([])
    const [userLocation, setUserLocation] = useState(null)

    //referentie naar map zodat die meteen naar de hotspot verplaats 
    const mapRef = useRef(null)

    const { storeLatitude, storeLongitude } = route?.params || {}

    useEffect(() => {

        startWatchingLocation()
        getRecordStores()

    }, [storeLatitude, storeLongitude])

    async function startWatchingLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            setErrorMessage('Access to location is denied.')
            return
        }

        if (storeLatitude && storeLongitude) {

            const storeLocation = {
                latitude: storeLatitude,
                longitude: storeLongitude,
                latitudeDelta: 0.0010,
                longitudeDelta: 0.0010,
            }

            setUserLocation(storeLocation)

            if (mapRef.current) {
                mapRef.current.animateToRegion(storeLocation, 1000)
            }

        } else {

            try {

                let currentLoc = await Location.getCurrentPositionAsync({})

                 const userLocation = {
                        latitude: currentLoc.coords.latitude,
                        longitude: currentLoc.coords.longitude,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.03,
                    }

                setUserLocation(userLocation)
               
                if (mapRef.current) {
                    mapRef.current.animateToRegion(userLocation, 1000)
                }

            } catch (error) {
                console.error("Er is een fout opgetreden", error);
            }

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
                initialRegion={userLocation}
                ref={mapRef}>
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

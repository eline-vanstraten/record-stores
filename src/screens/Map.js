import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../contexts/LayoutContext";
import MapView, { Marker, Polyline } from 'react-native-maps';
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

    const [currentUserLocation, setCurrentUserLocation] = useState(null)
    const [roadCoordinates, setRoadCoordinates] = useState([]);

    let subscription

    //referentie naar map zodat die meteen naar de hotspot verplaats 
    const mapRef = useRef(null)

    const { storeLatitude, storeLongitude } = route?.params || {}

    useEffect(() => {

        startWatchingLocation()
        getRecordStores()

        return () => {
            if (subscription) {
                subscription.remove()
            }
        }

    }, [storeLatitude, storeLongitude])

    async function startWatchingLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync()


        if (status !== 'granted') {
            setErrorMessage('Access to location is denied.')
            return
        }

        subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 2000,
                distanceInterval: 1,
            },
            async (newLocation) => {
                //positie uit newLocation halen
                const { latitude, longitude, heading } = newLocation.coords
                const newCoord = { latitude, longitude }

                setCurrentUserLocation(newCoord)

                if (mapRef.current && heading !== undefined && heading !== -1) {

                    setTimeout(() => {
                        mapRef.current.animateCamera({
                            center: newCoord,
                            heading: heading,
                        }, { duration: 1000 })
                    }, 2500)

                }

                //route over echte wegen ipv rechte lijn met gratis route server ORSM
                if (storeLatitude && storeLongitude) {
                    try {
                        //ORSM belangrijke coords meegeven, gebruiker en store
                        const url = `https://router.project-osrm.org/route/v1/driving/${newCoord.longitude},${newCoord.latitude};${storeLongitude},${storeLatitude}?overview=full&geometries=geojson`
                        const response = await fetch(url)
                        const json = await response.json()

                        //kijken of route gevonden is
                        if (json.routes && json.routes.length > 0) {
                            //krijgt lijst met opeenvolgende punten terug in array, omzetten naar object voor polyline
                            const coords = json.routes[0].geometry.coordinates.map((coord) => ({
                                latitude: coord[1],
                                longitude: coord[0],
                            }));
                            setRoadCoordinates(coords);
                        }

                    } catch (error) {
                        console.error("Er is een fout opgetreden", error);
                    }
                }


            }
        )

        if (storeLatitude && storeLongitude) {

            const storeLocation = {
                latitude: storeLatitude,
                longitude: storeLongitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.0015,
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
                showsCompass={true}
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

                {storeLatitude && storeLongitude && currentUserLocation && (
                    <Polyline
                        coordinates={roadCoordinates}
                        strokeColor={isDarkMode ? "#620000" : "#F57474"}
                        strokeWidth={3}
                        lineDashPattern={[3, 3]} />
                )}
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

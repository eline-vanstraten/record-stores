import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../contexts/LayoutContext";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export default function Map() {

    //darkmode
        const { isDarkMode } = useLayout()
        const styles = getStyles(isDarkMode)

        const [errorMessage, setErrorMessage] = useState(null)

        useEffect(() => {

            async function startWatchingLocation(){
                let {status} = await Location.requestForegroundPermissionsAsync()

                if(status !== 'granted') {
                    setErrorMessage('Access to location is denied.')
                    return
                }
            }

            startWatchingLocation()

        }, [])


    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map}
            showsUserLocation={true}>
            </MapView>
            {errorMessage && <Text style={{ marginTop: 10, color: isDarkMode ? "#F57474" : "#620000"}}>{errorMessage}</Text>}
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

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";
import { Ionicons } from '@expo/vector-icons';

export default function Card({ onPress, buttonText, storeName, type, onFavoritePress, isFavorite }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>

            <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
                <Ionicons name={isFavorite ? "star" : "star-outline"} size={30} color={isFavorite ? "#c9a722" : "#0c0c0c"}></Ionicons>
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>{storeName}</Text>
                <Text style={styles.typeText}>{type}</Text>
            </View>
            <CustomButton onPress={onPress}>{buttonText}</CustomButton>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffc1c1",
        borderWidth: 2,
        borderColor: "#620000",
        padding: 15,
        minHeight: 75,
        position: "relative",
        marginVertical: 8,
        width: 320,
        height: 200
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",

    },
    typeText: {
        fontSize: 18,
        padding: 10

    },
    favoriteButton: {
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 1
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    }

})
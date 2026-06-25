import RecordStoresList from "./stores/RecordStoresList"
import { View, StyleSheet } from "react-native"

export default function HomeScreen(){
    return (
        <View style={styles.container}>
            <RecordStoresList></RecordStoresList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F57474"
    }
})


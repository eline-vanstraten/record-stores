import { useLayout } from "../contexts/LayoutContext"
import RecordStoresList from "./stores/RecordStoresList"
import { View, StyleSheet } from "react-native"

export default function HomeScreen() {

    //dark mode
    const { isDarkMode } = useLayout()
    const styles = getStyles(isDarkMode)

    return (
        <View style={styles.container}>
            <RecordStoresList></RecordStoresList>
        </View>
    )
}

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? "#620000" : "#F57474"
    }
})


import { StyleSheet, View } from "react-native";
import { useLayout } from "../contexts/LayoutContext";

export default function Map() {

    //darkmode
        const { isDarkMode } = useLayout()
        const styles = getStyles(isDarkMode)

    return (
        <View style={styles.container}>
        </View>
    )
}

const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: isDarkMode ? "#620000" : "#F57474",
        alignItems: "center",
        justifyContent: "center",
    },
});

import { StyleSheet, Switch, Text, View } from "react-native";
import { useLayout } from "../contexts/LayoutContext";

export default function Settings() {

    const { isDarkMode, changeLayout } = useLayout()
    const styles = getStyles(isDarkMode)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {isDarkMode ? "Dark mode on" : "Light mode on"}
            </Text>

            <View style={styles.switch}>
                <Switch
                    value={isDarkMode}
                    onValueChange={changeLayout} />
            </View>

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
    text: {
        fontSize: 25,
        fontWeight: "bold",
        color: isDarkMode ? "#FFFFFF" : "#0c0c0c",
        textAlign: "center",
        marginBottom: 4

    },
    switch: {
         alignItems: "center",
        justifyContent: "center",
    }
});

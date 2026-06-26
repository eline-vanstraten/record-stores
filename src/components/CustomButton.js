import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useLayout } from "../contexts/LayoutContext";

export default function CustomButton({ onPress, children, style }) {

  //dark mode
    const { isDarkMode } = useLayout()
    const styles = getStyles(isDarkMode)

  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.buttonContainer,
      style
    ]}
    >
      <Text style={styles.buttonText}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const getStyles = (isDarkMode) => StyleSheet.create({
  buttonContainer: {
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 32,
    backgroundColor: isDarkMode ? "#0c0c0c" : "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: isDarkMode ? "#F57474" : "#620000",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: isDarkMode ? "#FFFFFF" : "#0c0c0c",
    fontWeight: "bold"
  }

})
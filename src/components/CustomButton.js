import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function CustomButton({ onPress, children, style }) {
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

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#620000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0c0c0c',
    fontWeight: 'bold'
  }

})
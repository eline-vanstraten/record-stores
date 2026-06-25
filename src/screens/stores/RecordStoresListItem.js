import { StyleSheet, View } from "react-native";
import Card from "../../components/Card";

export default function RecordStoresListItem({ store }) {
    return (
        <View style={styles.container}>
            <Card
                storeName={store.name}
                type={store.type}
                buttonText={"Show details"}>

            </Card>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 8

    },
});

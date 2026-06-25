import { StyleSheet, View } from "react-native";
import Card from "../../components/Card";
import { useNavigation } from "@react-navigation/native";

export default function RecordStoresListItem({ store }) {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Card
                storeName={store.name}
                type={store.type}
                buttonText={"Show details"}
                onPress={() => navigation.navigate("StoreDetail", {storeId: store.id})}>

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

import { StyleSheet, Text, View } from "react-native";

const ItemListing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chicken Shop</Text>
      <View style={styles.itemListingContainer}>
        <Text style={styles.listingTitle}>ItemListing</Text>
      </View>
    </View>
  );
};

export default ItemListing;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  itemListingContainer: {
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 20,
    width: "80%",
    height: "60%",
    overflow: "hidden",
    padding: 10,
  },
  listingTitle: {
    fontFamily: "Comic-Sans",
  },
  title: {
    fontFamily: "Comic-Sans-Bold",
    fontSize: 30,
    marginVertical: 10,
  },
});

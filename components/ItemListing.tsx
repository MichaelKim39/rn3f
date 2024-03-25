import { StyleSheet, Text, View } from "react-native";

const ItemListing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chicken Shop</Text>
      <View style={styles.itemListingContainer}>
        <Text style={styles.listingTitle}>My Roast Chicken</Text>
        <View>
          <Text style={styles.listingText}>Reviews:</Text>
          <Text style={styles.listingText}>Yeah it's pretty good</Text>
        </View>
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
    justifyContent: "space-between",
  },
  listingTitle: {
    fontFamily: "Comic-Sans",
    fontSize: 20,
  },
  listingText: {
    fontFamily: "Comic-Sans",
    fontSize: 14,
  },
  title: {
    fontFamily: "Comic-Sans-Bold",
    fontSize: 30,
    marginVertical: 10,
  },
});

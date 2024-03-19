import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import ItemListing from "components/ItemListing";
import { Chicken } from "components/Chicken";
import { useFonts } from "expo-font";

const HomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Comic-Sans": require("./assets/fonts/comic-sans-ms.ttf"),
    "Comic-Sans-Bold": require("./assets/fonts/comic-sans-ms-bold.ttf"),
  });

  return (
    <View style={styles.container}>
      <ItemListing />
      <Chicken />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

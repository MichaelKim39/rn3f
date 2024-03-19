import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import ItemListing from "components/ItemListing";
import { Chicken } from "components/Chicken";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";

const HomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Comic-Sans": require("../assets/fonts/comic-sans-ms.ttf"),
    "Comic-Sans-Bold": require("../assets/fonts/comic-sans-ms-bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
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

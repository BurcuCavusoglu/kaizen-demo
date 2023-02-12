import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { PromotionDetail } from "../components/PromotionDetail";

export default function DetailScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <PromotionDetail navigation={navigation} />
    </SafeAreaView>
  );
}

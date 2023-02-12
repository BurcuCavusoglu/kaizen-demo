import * as React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import { Header } from "../components/Header";
import { TabNav } from "../components/TabNav";
import { Slider } from "../components/Slider";
import { FooterNav } from "../components/FooterNav";
import styles from "../style/basestyle";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <ScrollView style={styles.main}>
        <Header />
        <TabNav />
        <Slider navigation={navigation} />
      </ScrollView>
      <FooterNav />
    </SafeAreaView>
  );
}

import * as React from "react";
import { View, Image, Pressable, Text } from "react-native";
import styles from "../style/basestyle";

export const FooterNav = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footer_icon_box}>
        <Pressable>
          <Image source={require("../assets/footericons/discover.png")} />
        </Pressable>
        <Pressable style={styles.footer_icon_center}>
          <Image source={require("../assets/footericons/PORTAL.png")} />
        </Pressable>
        <Pressable>
          <Image source={require("../assets/footericons/vallet.png")} />
        </Pressable>
      </View>
    </View>
  );
};

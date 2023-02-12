import { React, useState } from "react";
import { View, Image, Pressable, Text } from "react-native";
import styles from "../style/basestyle";

export const Header = () => {
  const [login, setLogin] = useState(false);

  const UserPart = () => {
    const isLogin = login;

    return (
      <View style={styles.header_user_part}>
        {isLogin ? (
          <View
            style={[
              styles.header_user_button,
              styles.header_user_button_islogin,
            ]}
          >
            <Image source={require("../assets/headericons/Profile.png")} />
            <View style={styles.header_user_button_notification}></View>
          </View>
        ) : (
          <>
            <Pressable
              style={styles.header_login_button}
              onPress={() => setLogin(true)}
            >
              <Text style={styles.header_login_button_title}>Giriş Yap</Text>
            </Pressable>
            <View
              style={[
                styles.header_user_button,
                styles.header_user_button_notlogin,
              ]}
            >
              <Image source={require("../assets/headericons/Profile.png")} />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <Image source={require("../assets/headericons/Daha_Daha.png")} />
      <UserPart />
    </View>
  );
};

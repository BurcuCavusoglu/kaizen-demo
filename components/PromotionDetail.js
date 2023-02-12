import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { promotionsStore } from "../store/PromotionsStore";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import styles from "../style/basestyle";
import { Icon } from "react-native-elements";

export const PromotionDetail = observer(({ navigation }) => {
  const loading = useMemo(
    () => (promotionsStore.loadingpromotion ? true : false),
    [promotionsStore.loadingpromotion]
  );

  const detail = useMemo(
    () => promotionsStore.promotion ?? null,
    [promotionsStore.promotion]
  );

  return (
    <>
      {loading ? (
        <View>
          <Text>yükleniyor</Text>
        </View>
      ) : (
        <View style={styles.promotion_detail_container}>
          <ScrollView style={styles.promotion_detail}>
            <View style={styles.promotion_detail_box}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.go_back_button}
              >
                <Image source={require("../assets/Back_Button.png")} />
              </Pressable>
              <View style={styles.promotion_detail_image_box}>
                <Image
                  source={{ uri: `${detail.ImageUrl}` }}
                  style={styles.promotion_detail_image_box_image}
                />
              </View>

              <View style={styles.slider_box_info}>
                <Text style={styles.slider_box_info_text}>
                  {detail.RemainingText}
                </Text>
              </View>

              <View style={styles.promotion_detail_icon_box}>
                <Image
                  source={{ uri: `${detail.BrandIconUrl}` }}
                  style={styles.promotion_detail_icon_box_image}
                />
              </View>
            </View>

            <View style={styles.promotion_detail_info_box}>
              <Text style={styles.promotion_detail_info_box_title}>
                {detail.Title.replace(/<\/?[^>]+(>|$)/g, "")}
              </Text>
              <Text style={styles.promotion_detail_info_box_description}>
                {detail.Description.replace(/<\/?[^>]+(>|$)/g, "")}
              </Text>
            </View>
          </ScrollView>

          <Pressable style={styles.promotion_detail_button}>
            <Text style={styles.promotion_detail_button_text}>
              {detail.BrandPromotionCardParticipationText.replace(
                /<\/?[^>]+(>|$)/g,
                ""
              )}
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
});

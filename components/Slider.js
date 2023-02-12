import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react";
import { promotionsStore } from "../store/PromotionsStore";
import { View, Text, Dimensions, Image, Pressable } from "react-native";
import styles from "../style/basestyle";

import Carousel from "react-native-anchor-carousel";

export const Slider = observer(({ navigation }) => {
  const carouselRef = useRef(null);
  const { width: windowWidth } = Dimensions.get("window");
  const loading = useMemo(
    () => (promotionsStore.loadingpromotions ? true : false),
    [promotionsStore.loadingpromotions]
  );
  const promotionList = useMemo(
    () => promotionsStore.promotions ?? [],
    [promotionsStore.promotions]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    promotionsStore.getPromotions();
  }, []);

  const goToDetail = (Id) => {
    promotionsStore.getPromotionById(Id).then(() => {
      navigation.navigate("campaign");
    });
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          goToDetail(item.Id);
        }}
        style={styles.slider_box_wrapper}
      >
        <View
          style={[
            styles.slider_box_back,
            { backgroundColor: item.PromotionCardColor },
          ]}
        ></View>
        <View style={styles.slider_box_front}>
          <View style={styles.slider_Image_box}>
            <Image
              source={{ uri: `${item.ImageUrl}` }}
              style={styles.slider_Image}
            />
            <View style={styles.slider_BrandIcon_box}>
              <Image
                source={{ uri: `${item.BrandIconUrl}` }}
                style={styles.slider_BrandIcon}
              />
            </View>
            <View style={styles.slider_box_info}>
              <Text style={styles.slider_box_info_text}>
                {item.RemainingText}
              </Text>
            </View>
          </View>
          <View style={styles.slider_box_text}>
            <Text style={styles.slider_box_title}>
              {item.Title.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
            <Text
              style={[
                styles.slider_box_title,
                { color: item.PromotionCardColor, marginVertical: 20 },
              ]}
            >
              Daha Daha
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const PaginationDots = () => {
    return (
      <View style={styles.dots}>
        {promotionList.map((item, index) => (
          <Pressable
            onPress={() => {
              carouselRef.current.scrollToIndex(index);
              setActiveIndex(index);
            }}
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex ? item.PromotionCardColor : "#D8D8D8",
                width: index === activeIndex ? 20 : 8,
              },
            ]}
          ></Pressable>
        ))}
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <View>
          <Text>yükleniyor</Text>
        </View>
      ) : (
        <View>
          <Carousel
            ref={carouselRef}
            data={promotionList}
            renderItem={renderItem}
            style={styles.slider}
            itemWidth={windowWidth * 0.8}
            containerWidth={windowWidth}
            separatorWidth={0}
            inActiveOpacity={1}
            inActiveScale={1}
            onScrollEnd={(_item, index) => setActiveIndex(index)}
          />
          <PaginationDots />
        </View>
      )}
    </>
  );
});

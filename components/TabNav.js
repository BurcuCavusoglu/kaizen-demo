import React, { useLayoutEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { tagsStore } from "../store/TagsStore";
import { FlatList, View, Text, Image, Pressable } from "react-native";
import styles from "../style/basestyle";

export const TabNav = observer(() => {
  const [selected, setSelected] = useState(null);
  const loading = useMemo(
    () => (tagsStore.loadingtags ? true : false),
    [tagsStore.loadingtags]
  );
  const tags = useMemo(() => tagsStore.tags ?? [], [tagsStore.tags]);

  useLayoutEffect(() => {
    tagsStore.getTags();
  }, []);

  const tabItem = (item) => {
    return (
      <Pressable
        style={[
          styles.tag_box,item.Id === selected ? styles.tag_box_selected:styles.tag_box_notselected
        ]}
        onPress={() => {
          setSelected(item.Id);
        }}
      >
        <Image
          source={{ uri: `${item.IconUrl}` }}
          style={styles.tag_box_image}
        />
        <Text style={styles.tag_box_title}>{item.Name}</Text>
      </Pressable>
    );
  };

  return (
    <>
      {loading ? (
        <View>
          <Text>yükleniyor</Text>
        </View>
      ) : (
        <FlatList
          data={tags}
          renderItem={({ item }) => tabItem(item)}
          keyExtractor={(item) => item.Id}
          horizontal={true}
          style={styles.tags}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{height:40,flexGrow:0}}
        />
      )}
    </>
  );
});

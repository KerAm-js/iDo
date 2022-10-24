import { Animated, Pressable, Text, TouchableOpacity } from "react-native";
import { tabRenderProps } from "./types";
import { SvgXml } from "react-native-svg";
import { icons, accentColorIcons } from "../../../../assets/icons/tabBar";
import { tabBarStyles } from "./styles";
import { textColors } from "../../../styles/global/colors";
import { FC, useRef } from "react";

const TabsRender: FC<tabRenderProps> = ({
  routes,
  stateIndex,
  descriptors,
  navigation,
  number,
}) => {
  return (
    <>
      {routes.map((route: any, index: any) => {
        const tabScale = useRef(new Animated.Value(1)).current;
        const { options } = descriptors[route.key];
        const label: string =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const iconNumber = number === 2 ? index + number : index;

        const isFocused = iconNumber === stateIndex;

        const onPress = () => {
          Animated.sequence([
            Animated.timing(tabScale, {toValue: 0.8, useNativeDriver: true, duration: 130, }),
            Animated.timing(tabScale, {toValue: 1, useNativeDriver: true, duration: 90, }),
          ]).start();

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name, {merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabBarStyles.button}
            key={route.key}
          >
            <Animated.View style={[{ transform: [{ scale: tabScale }] }]}>
              <SvgXml
                xml={isFocused ? accentColorIcons[iconNumber] : icons[iconNumber]}
                style={[tabBarStyles.icon]}
                width={tabBarStyles.icon.width}
                height={tabBarStyles.icon.height}
              />
            </Animated.View>
            <Text
              style={[
                { color: isFocused ? textColors.blue : textColors.grey },
                tabBarStyles.title,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </>
  );
};

export default TabsRender;
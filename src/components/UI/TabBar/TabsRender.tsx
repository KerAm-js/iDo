import { Animated, Pressable } from "react-native";
import { tabRenderProps } from "./types";
import { SvgXml } from "react-native-svg";
import { icons } from "../../../../assets/icons/tabBar";
import { tabBarStyles } from "./styles";
import { textColors } from "../../../styles/global/colors";
import { FC, useRef } from "react";
import LangText from "../LangText/LangText";
import { languageTexts } from "../../../utils/languageTexts";
import { LangObjectType } from "../../../types/global/LangObject";

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

        const iconNumber = number === 2 ? index + 1 : index;

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
            navigation.navigate(route.name, {merge: true});
          }
        };

        let labelObject: LangObjectType = languageTexts.screenTitles.home;

        if (label === 'Prefs') {
          labelObject = languageTexts.screenTitles.prefs;
        }

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={tabBarStyles.button}
            key={route.key}
          >
            <Animated.View style={[{ transform: [{ scale: tabScale }] }]}>
              <SvgXml
                xml={icons[iconNumber](isFocused ? textColors.blue : textColors.grey)}
                style={[tabBarStyles.icon]}
                width={tabBarStyles.icon.width}
                height={tabBarStyles.icon.height}
              />
            </Animated.View>
            <LangText
              title={labelObject}
              style={[
                { color: isFocused ? textColors.blue : textColors.grey },
                tabBarStyles.title,
              ]}
            />
          </Pressable>
        );
      })}
    </>
  );
};

export default TabsRender;
import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Animated, StyleSheet, View } from "react-native";
import { screenLayoutStyles } from "./styles";
import { ScreenLayoutProps } from "./types";
import { subTitle16, textGrey } from "../../../styles/global/texts";
import { useHeaderHeight } from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { headerTitleStyle } from "../../../styles/header";
import LangText from "../../UI/LangText/LangText";
import { LanguageType } from "../../../redux/types/prefs";

const ScreenLayout: FC<ScreenLayoutProps> = React.memo(
  ({
    title,
    headingRight: HeadingRight,
    subtitle,
    subtitleComponent: SubtitleComponent,
    onMount,
    onUnmount,
    children,
  }) => {
    const theme = useTheme();
    const [headerShown, setHeaderShown] = useState(false);
    const headerHeight = useHeaderHeight();
    const tabBarHeight = useBottomTabBarHeight();
    const navigation = useNavigation();

    const scrollY = useRef(new Animated.Value(0)).current;
    const headerOpactiy = useRef(new Animated.Value(0)).current;
    const titleTranslationY = useRef(new Animated.Value(12)).current;

    const titleScale = scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.1, 1],
      extrapolate: "clamp",
    });

    const translateX = scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [12, 0],
      extrapolate: "clamp",
    });

    const headerBlurBackgroundOpacity = scrollY.interpolate({
      inputRange: [66, 76],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const headerBackgroundOpacity = scrollY.interpolate({
      inputRange: [75.5, 76],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const handleScroll = (event: any) => {
      if (event.nativeEvent.contentOffset.y > 30 && !headerShown) {
        setHeaderShown(true);
        Animated.timing(headerOpactiy, {
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }).start();
        Animated.timing(titleTranslationY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 220,
        }).start();
      } else if (event.nativeEvent.contentOffset.y <= 30 && headerShown) {
        setHeaderShown(false);
        Animated.timing(headerOpactiy, {
          toValue: 0,
          useNativeDriver: true,
          duration: 140,
        }).start();
        Animated.timing(titleTranslationY, {
          toValue: 12,
          useNativeDriver: true,
          duration: 170,
        }).start();
      }
    };

    const setScreenTitle = (language: LanguageType) => {
      let newTitle;
      if (typeof title === "function") {
        newTitle = title(language);
      } else {
        newTitle = title[language];
      }
      navigation.setOptions({
        title: newTitle,
      });
    };

    useEffect(() => {
      if (onMount) onMount();
      return () => {
        if (onUnmount) onUnmount();
      };
    }, []);

    useEffect(() => {
      navigation.setOptions({
        headerStyle: { opacity: headerOpactiy },
        headerTitleStyle: {
          ...headerTitleStyle,
          color: theme.colors.text,
          transform: [{ translateY: titleTranslationY }],
        },
        // headerRight: () => HeadingRight,
        headerBackground: () => (
          <View
            style={[
              StyleSheet.absoluteFill,
              { position: "absolute", overflow: "hidden" },
            ]}
          >
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  opacity: headerBackgroundOpacity,
                  backgroundColor: theme.colors.background,
                  position: "absolute",
                },
              ]}
            />
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                { opacity: headerBlurBackgroundOpacity, position: "absolute" },
              ]}
            >
              <BlurView
                tint={theme.dark ? "dark" : "default"}
                intensity={75}
                style={[StyleSheet.absoluteFill]}
              />
            </Animated.View>
          </View>
        ),
      });
    }, [theme]);

    let newTitle;
      if (typeof title === "function") {
        newTitle = title('ru');
      } else {
        newTitle = title['ru'];
      }

    console.log("screen layout", newTitle);

    return (
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true, listener: handleScroll }
        )}
        style={[
          screenLayoutStyles.container,
          {
            paddingTop: headerHeight,
          },
        ]}
      >
        <View style={screenLayoutStyles.headingContainer}>
          <View style={screenLayoutStyles.titleContainer}>
            <Animated.View
              style={{ transform: [{ scale: titleScale }, { translateX }] }}
            >
              <LangText
                title={title}
                style={screenLayoutStyles.title}
                setScreenTitle={setScreenTitle}
              />
            </Animated.View>
            {HeadingRight}
          </View>
          {subtitle && (
            <LangText
              handleTheme={false}
              title={subtitle}
              style={[subTitle16, textGrey]}
            />
          )}
          {SubtitleComponent}
        </View>
        {children}
        <View style={{ height: tabBarHeight + 200 }} />
      </Animated.ScrollView>
    );
  }
);

export default ScreenLayout;

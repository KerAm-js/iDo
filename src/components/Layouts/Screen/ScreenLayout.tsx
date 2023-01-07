import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Animated, Text, StyleSheet, View } from "react-native";
import { screenLayoutStyles } from "./styles";
import { ScreenLayoutProps } from "./types";
import { subTitle16, textGrey, title30 } from "../../../styles/global/texts";
import { useHeaderHeight } from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { headerTitleStyle } from "../../../styles/header";

const ScreenLayout: FC<ScreenLayoutProps> = React.memo(
  ({
    children,
    title,
    headingRight: HeadingRight,
    subtitle,
    subtitleComponent: SubtitleComponent,
    onMount,
    onUnmount,
  }) => {
    const theme = useTheme();
    const [headerShown, setHeaderShown] = useState(false);
    const headerHeight = useHeaderHeight();
    const tabBarHeight = useBottomTabBarHeight();
    const navigation = useNavigation();

    const scrollY = useRef(new Animated.Value(0)).current;
    const headerOpactiy = useRef(new Animated.Value(0)).current;
    const titleTranslationY = useRef(new Animated.Value(10)).current;

    const titleScale = scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.2, 1],
      extrapolate: "clamp",
    });

    const translateX = scrollY.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [23, 13, 0],
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
          duration: 150,
        }).start();
        Animated.timing(titleTranslationY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 150,
        }).start();
      } else if (event.nativeEvent.contentOffset.y <= 30 && headerShown) {
        setHeaderShown(false);
        Animated.timing(headerOpactiy, {
          toValue: 0,
          useNativeDriver: true,
          duration: 100,
        }).start();
        Animated.timing(titleTranslationY, {
          toValue: 10,
          useNativeDriver: true,
          duration: 100,
        }).start();
      }
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
        title,
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
                intensity={80}
                style={[StyleSheet.absoluteFill]}
              />
            </Animated.View>
          </View>
        ),
      });
    }, [theme]);

    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
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
            <Animated.Text
              style={[
                title30,
                screenLayoutStyles.title,
                { transform: [{ scale: titleScale }, { translateX }] },
              ]}
            >
              {title}
            </Animated.Text>
            {HeadingRight}
          </View>
          {subtitle && <Text style={[subTitle16, textGrey]}>{subtitle}</Text>}
          {SubtitleComponent}
        </View>
        {children}
        <View style={{ height: tabBarHeight + 200 }} />
      </Animated.ScrollView>
    );
  }
);

export default ScreenLayout;

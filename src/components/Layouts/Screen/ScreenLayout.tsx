import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Animated, Text, StyleSheet, View, StatusBar } from "react-native";
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
    const [themeToggling, _] = useState(new Animated.Value(1));

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

    const handleScroll = (event: any) => {
      if (event.nativeEvent.contentOffset.y > 30 && !headerShown) {
        setHeaderShown(true);
        Animated.timing(headerOpactiy, {
          toValue: 1,
          useNativeDriver: true,
          duration: 200,
        }).start();
      } else if (event.nativeEvent.contentOffset.y <= 30 && headerShown) {
        setHeaderShown(false);
        Animated.timing(headerOpactiy, {
          toValue: 0,
          useNativeDriver: true,
          duration: 200,
        }).start();
      }
    };

    useEffect(() => {
      if (onMount) onMount();
      return () => {
        if (onUnmount) onUnmount();
      }
    }, [])

    useEffect(() => {
      Animated.timing(themeToggling, {
        toValue: theme.dark ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      navigation.setOptions({
        headerStyle: { opacity: headerOpactiy },
        headerTitleStyle: {
          ...headerTitleStyle,
          color: theme.colors.text,
        },
        headerRight: () => HeadingRight,
        headerBackground: () => (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { opacity: headerOpactiy, position: "absolute" },
            ]}
          >
            <BlurView
              tint={theme.dark ? "dark" : "default"}
              intensity={80}
              style={[StyleSheet.absoluteFill]}
            />
          </Animated.View>
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
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
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

import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated, Text, StyleSheet, View } from "react-native";
import { headerStyle } from "../../../styles/header";
import { screenLayoutStyles } from "./styles";
import { ScreenLayoutProps } from "./types";
import { subTitle16, textGrey, title30 } from "../../../styles/global/texts";
import { useHeaderHeight } from "@react-navigation/elements";
import { BlurView } from "expo-blur";


const ScreenLayout: FC<ScreenLayoutProps> = ({
  children,
  title,
  headingLeft: HeaderLeft,
  headerRight: HeaderRight,
  subtitle,
  subtitleComponent: SubtitleComponent,
}) => {
  const [headerShown, setHeaderShown] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = useHeaderHeight();

  const navigation = useNavigation();

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

  const headerOpactiy = useRef(new Animated.Value(0)).current;
  const headerBackgroundOpacity = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 35 && !headerShown) {
      setHeaderShown(true);
      Animated.timing(headerOpactiy, {
        toValue: 1,
        useNativeDriver: true,
        duration: 200,
      }).start();
      Animated.timing(headerBackgroundOpacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: 200,
      }).start();
    } else if (event.nativeEvent.contentOffset.y <= 35 && headerShown) {
      setHeaderShown(false);
      Animated.timing(headerOpactiy, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
      Animated.timing(headerBackgroundOpacity, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: [{ opacity: headerOpactiy }, headerStyle],
      headerBackground: () => (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: headerBackgroundOpacity }]}>
          <BlurView tint="default" intensity={80} style={[StyleSheet.absoluteFill]} />
        </Animated.View>
      ),
    });
  }, []);

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
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
      style={[screenLayoutStyles.container, { paddingTop: headerHeight }]}
    >
      <View style={[screenLayoutStyles.headingContainer]}>
        <View style={[screenLayoutStyles.titleContainer]}>
          <Animated.Text
            style={[
              title30,
              screenLayoutStyles.title,
              { transform: [{ scale: titleScale }, { translateX }] },
            ]}
          >
            {title}
          </Animated.Text>
          {HeaderLeft}
        </View>
        {subtitle && <Text style={[subTitle16, textGrey]}>{subtitle}</Text>}
        {SubtitleComponent}
      </View>
      {children}
    </Animated.ScrollView>
  );
};

export default ScreenLayout;

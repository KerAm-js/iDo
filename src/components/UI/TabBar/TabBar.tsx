import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FC } from "react";
import { BlurView } from "expo-blur";
import { useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { themeColors } from "../../../styles/global/colors";
import { TabBarPropTypes } from "./types";
import CircleButton from "../buttons/CircleButton/CircleButton";
import { plus } from "../../../../assets/icons/plus";
import TabsRender from "./TabsRender";
import { tabBarStyles } from "./styles";

const TabBar: FC<TabBarPropTypes> = ({
  state,
  descriptors,
  navigation,
  onBigButtonClick,
}) => {
  const { dark } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const onCircleButtonClick = () => {
    setTimeout(onBigButtonClick, 200);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  const middleIndex = Math.round(state.routes.length / 2);

  return (
    <BlurView
      tint={dark ? "dark" : "default"}
      intensity={70}
      style={[
        tabBarStyles.container,
        { paddingBottom: bottom > 0 ? bottom + 10 : 25 },
      ]}
    >
      <TabsRender
        routes={state.routes.slice(0, middleIndex)}
        stateIndex={state.index}
        descriptors={descriptors}
        navigation={navigation}
        number={1}
      />
      <View style={tabBarStyles.circleButtonContainer}>
        <CircleButton xml={plus(themeColors.dark.colors.text)} onClick={onCircleButtonClick} size="big" />
      </View>
      <TabsRender
        routes={state.routes.slice(middleIndex)}
        stateIndex={state.index}
        descriptors={descriptors}
        navigation={navigation}
        number={2}
      />
    </BlurView>
  );
};

export default TabBar;

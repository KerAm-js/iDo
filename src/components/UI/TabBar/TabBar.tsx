import { StyleSheet, View } from "react-native";
import { tabBarStyles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircleButton from "../buttons/CircleButton/CircleButton";
import { plus } from "../../../../assets/icons/plus";
import TabsRender from "./TabsRender";
import { FC } from "react";
import { TabBarPropTypes } from "./types";
import { BlurView } from "expo-blur";
import { themeColors } from "../../../styles/global/colors";
import { useSelector } from "react-redux";
import { prefsSelector } from "../../../redux/selectors/prefsSelectors";

const TabBar: FC<TabBarPropTypes> = ({
  state,
  descriptors,
  navigation,
  onBigButtonClick,
}) => {
  const { theme } = useSelector(prefsSelector);
  const { bottom } = useSafeAreaInsets();
  const onCircleButtonClick = () => {
    setTimeout(onBigButtonClick, 200);
  };
  const middleIndex = Math.round(state.routes.length / 2);
  return (
    <BlurView
      tint={theme === "dark" ? "dark" : "default"}
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

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FC } from "react";
import { BlurView } from "expo-blur";
import { useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { themeColors } from "../../../styles/global/colors";
import CircleButton from "../buttons/CircleButton/CircleButton";
import { plus } from "../../../../assets/icons/plus";
import TabsRender from "./TabsRender";
import { tabBarStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/types/appDispatch";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { setTaskPopupVisibleAction } from "../../../redux/actions/popupsActions";

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { dark } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const dispatch: AppDispatch = useDispatch();
  const onCircleButtonClick = () => {
    setTimeout(() => {
      dispatch(setTaskPopupVisibleAction(true));
    }, 200);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  const middleIndex = Math.round(state.routes.length / 2);

  return (
    <BlurView
      tint={dark ? "dark" : "default"}
      intensity={75}
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
        <CircleButton
          xml={plus(themeColors.dark.colors.text)}
          onClick={onCircleButtonClick}
          size="big"
        />
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

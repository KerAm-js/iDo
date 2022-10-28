import { View } from "react-native";
import { tabBarStyles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircleButton from "../buttons/CircleButton/CircleButton";
import { plus } from "../../../../assets/icons/plus";
import TabsRender from "./TabsRender";
import { FC } from "react";
import { TabBarPropTypes } from "./types";

const TabBar: FC<TabBarPropTypes> = ({ state, descriptors, navigation, onBigButtonClick }) => {
  const { bottom } = useSafeAreaInsets();
  const onCircleButtonClick = () => {
    setTimeout(onBigButtonClick, 200);
  }
  return (
    <View style={[tabBarStyles.container, { paddingBottom: bottom + 10 || 25 }]}>
      <TabsRender
        routes={state.routes.slice(0, 2)}
        stateIndex={state.index}
        descriptors={descriptors}
        navigation={navigation}
        number={1}
      />
      <View style={[tabBarStyles.circleButtonContainer, ]}>
        <CircleButton xml={plus} onClick={onCircleButtonClick} size="big" />
      </View>
      <TabsRender
        routes={state.routes.slice(2)}
        stateIndex={state.index}
        descriptors={descriptors}
        navigation={navigation}
        number={2}
      />
    </View>
  );
};

export default TabBar;

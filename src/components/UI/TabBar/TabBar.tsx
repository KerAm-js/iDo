import { View } from "react-native";
import { tabBarStyles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CircleButton from "./CircleButton/CircleButton";
import { plus } from "../../../../assets/icons/plus";
import TabsRender from "./TabsRender";
import { FC } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { bottom } = useSafeAreaInsets();
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
        <CircleButton xml={plus} onClick={() => console.log('clicked')} />
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

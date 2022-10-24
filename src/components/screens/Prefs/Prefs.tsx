import React, { FC } from "react";
import { Text, SafeAreaView, View } from "react-native";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";

const Prefs: FC = () => {
  return (
    <ScreenLayout title="Настройки">
      <View style={{ height: 2000 }}></View>
    </ScreenLayout>
  )
}

export default Prefs;
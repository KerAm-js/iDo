import React, { FC } from "react";
import { Text, SafeAreaView, View } from "react-native";
import ScreenLayout from "../../Layouts/ScreenLayout/ScreenLayout";

const Stats: FC = () => {
  return (
    <ScreenLayout title="Статистика">
      <View style={{ height: 2000 }}></View>
    </ScreenLayout>
  )
}

export default Stats;
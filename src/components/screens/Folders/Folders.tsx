import React, { FC } from "react";
import { Text, SafeAreaView, View } from "react-native";
import ScreenLayout from "../../Layouts/ScreenLayout/ScreenLayout";

const Folders: FC = () => {
  return (
    <ScreenLayout title="Папки">
      <View style={{ height: 2000 }}></View>
    </ScreenLayout>
  )
}

export default Folders;
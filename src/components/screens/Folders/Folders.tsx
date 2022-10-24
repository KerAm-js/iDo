import React, { FC } from "react";
import { View } from "react-native";
import { backgroundColors } from "../../../styles/global/colors";
import ScreenLayout from "../../Layouts/Screen/ScreenLayout";

const Folders: FC = () => {
  return (
    <ScreenLayout title="Папки">
      <View style={{ height: 2000}}></View>
    </ScreenLayout>
  );
};

export default Folders;

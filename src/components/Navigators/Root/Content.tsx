import React from "react";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";
import LanguagePopup from "../../Popups/LanguagePopup/LanguagePopup";
import ReminderPopup from "../../Popups/ReminderPopup/ReminderPopup";
import TabNavigator from "../Tab/TabNavigator";

const RootContent = () => {
  return (
    <React.Fragment>
      <AddTaskPopup />
      <CalendarPopup />
      <ReminderPopup hasDeleteButton />
      <LanguagePopup />
      <TabNavigator />
    </React.Fragment>
  );
};

export default React.memo(RootContent);

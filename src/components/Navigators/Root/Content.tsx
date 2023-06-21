import React from "react";
import AddTaskPopup from "../../Popups/AddTaskPopup/AddTaskPopup";
import CalendarPopup from "../../Popups/CalendarPopup/CalendarPopup";
import LanguagePopup from "../../Popups/LanguagePopup/LanguagePopup";
import ReminderPopup from "../../Popups/ReminderPopup/ReminderPopup";
import TabNavigator from "../Tab/TabNavigator";
import Message from "../../UI/Message/Message";

const RootContent = () => {
  return (
    <React.Fragment>
      <AddTaskPopup />
      <CalendarPopup />
      <ReminderPopup />
      <LanguagePopup />
      <TabNavigator />
      <Message />
    </React.Fragment>
  );
};

export default React.memo(RootContent);

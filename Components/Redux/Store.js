import { configureStore, combineReducers } from "@reduxjs/toolkit";
import NotificationReducer from "./NotificationSlice";
import PTMNotificationReducer from "./PtmNotificationSlice";
import GeneralNotificationReducer from "./GeneralNotification";

const rootReducer = combineReducers({
  Notification: NotificationReducer,
  PTMNotification: PTMNotificationReducer,
  GeneralNotification:GeneralNotificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

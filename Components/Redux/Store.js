import { configureStore, combineReducers } from "@reduxjs/toolkit";
import NotificationReducer from "./NotificationSlice";
import PTMNotificationReducer from "./PtmNotificationSlice";

const rootReducer = combineReducers({
  Notification: NotificationReducer,
  PTMNotification: PTMNotificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

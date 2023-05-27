import { configureStore } from "@reduxjs/toolkit";

import NotificationReducer from "./NotificationSlice";
const store=configureStore({
    reducer:{Notification:NotificationReducer}
})
export default store;
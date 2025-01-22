import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReduce from "./connectionSlice";
import requestReducer from "./requestSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReduce,
        request: requestReducer,
    },
});

export default appStore;
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeedFromFeed: (state, action) => {
            return state ? state.filter(user => user._id !== action.payload) : null;
        },
    },
});

export const { addFeed, removeFeedFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
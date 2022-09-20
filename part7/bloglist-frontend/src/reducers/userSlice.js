import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    logIn: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { logIn } = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      const content = action.payload;
      state.push(content);
    }
  }
});

export const addBlog = blogSlice.actions.addBlog;

export default blogSlice.reducer;
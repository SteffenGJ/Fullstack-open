import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: ""
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
})

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer
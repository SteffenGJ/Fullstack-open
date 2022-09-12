import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: ""
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        },
        removeMessage: state => {
            state.message = ""
        }
    }
})

export const {setMessage, removeMessage} = notificationSlice.actions;

let timeoutID;

export const setNotification = (content, sec) => {
    return async (dispatch) => {
        const time = sec * 1000;
        clearTimeout(timeoutID);
        dispatch(setMessage(content));
        timeoutID = setTimeout(() => {
            dispatch(removeMessage());
        }, time);
    }
}

export default notificationSlice.reducer
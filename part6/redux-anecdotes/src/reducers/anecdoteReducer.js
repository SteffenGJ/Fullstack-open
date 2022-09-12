import { createSlice } from "@reduxjs/toolkit"
import { createNew, getAll, handleVote } from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes: (state, action) => {
      return action.payload;
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    changeAnecdote: (state, action) => {
      const index = state.findIndex(obj => obj.id === action.payload.id);
      state[index].votes += 1; 
    }
  }
})


export const {setAnecdotes, appendAnecdote, changeAnecdote} = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const dotes = await getAll();
    dispatch(setAnecdotes(dotes));
  }
};

export const createAnecdotes = content => {
  return async (dispatch) => {
    const dote = await createNew(content);
    dispatch(appendAnecdote(dote));
  }
}

export const voteOnAnecdote = anecdote => {
  return async (dispatch) => {
    const dote = await handleVote(anecdote);
    dispatch(changeAnecdote(dote))
  }
}

export default anecdotesSlice.reducer;
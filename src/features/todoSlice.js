import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  searchQuery: "",
};

export const counterSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, text, priority } = action.payload;
      const selectedUpdateTask = state.list.find((task) => task.id === id);
      if (selectedUpdateTask) {
        selectedUpdateTask.text = text;
        selectedUpdateTask.priority = priority;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, deleteTask, updateTask, searchTask } =
  counterSlice.actions;

export default counterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list:[]
}

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list.push(action.payload)
    },
    deleteTask:(state,action)=>{
      state.list=state.list.filter((todo) => todo.id !== action.payload)
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addTask, deleteTask,updateTask } = counterSlice.actions

export default counterSlice.reducer
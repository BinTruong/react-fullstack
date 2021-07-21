import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    userList: null,
    bookList: null,
    categoryList: null
  },
  reducers: {
    setUserList(state, action) {
      state.username = action.payload.username;
    },
    setBookList(state, action) {
      state.username = action.payload.username;
    },
    setCategoryList(state, action) {
      state.username = action.payload.username;
    }
  },
  extraReducers: {}
});

const adminReducer = adminSlice.reducer;

export const authActions = adminSlice.actions;

export default adminReducer;

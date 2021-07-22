import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    role: null,
    token: null
  },
  reducers: {
    setUserInfo(state, action) {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.token = action.payload.token;
    }
  },
  extraReducers: {}
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export default authReducer;

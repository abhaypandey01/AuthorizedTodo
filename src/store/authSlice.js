import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null, status: false },
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.status = false;
    },
    login: (state, action) => {
      state.status = true
      state.userData = action.payload
    }
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;

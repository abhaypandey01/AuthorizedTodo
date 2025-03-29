import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../appwrite/services/authService";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const data = await authService.getCurrentUser();
    return data;
  } catch (error) {
    console.log(error.message || "User fetch failed in auth slice js.");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null, status: "idle" },
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../appwrite/services/authService";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    return await authService.getCurrentUser();
});

const userSlice = createSlice({
    name: "user",
    initialState: { user: null, status: "idle" },
    reducers: {
        logout: (state) => { state.user = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUser.rejected, (state) => {
                state.status = "failed";
            });
    }
    
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

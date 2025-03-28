import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from '../appwrite/services/todoService';

// fetch todos
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (userId, { rejectWithValue }) => { 
        try {
            const response = await todoService.getTodos(userId);
            return response.documents; //todo array in documents
        } catch (error) {
            console.log("error in fetching todos: ", error.message);
            return rejectWithValue(error.message)
        }
    }
);

// create todo
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async ({ userId, text }, { rejectWithValue }) => {
        try {
            const newTodo = await todoService.createTodo({ userId, text });
            return newTodo;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// update todo
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async ({ todoId, updates }, { rejectWithValue }) => {
        try {
            const updatedTodo = await todoService.updateTodo(todoId, updates);
            return updatedTodo;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//delete todo
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (todoId, {rejectWithValue}) => {
        try {
            await todoService.deleteTodo(todoId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// todo slice
const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetch todos
        .addCase( fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
        } )
        .addCase( fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload;
        } )
        .addCase( fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } )

        //add todo
        .addCase( addTodo.fulfilled, (state, action) => {
            state.todos.unshift(action.payload);
        } )
        .addCase( updateTodo.fulfilled, (state, action) => {
            const index = state.todos.findIndex(todo => todo.$id === action.payload.$id);
            if( index !== -1 ){
                state.todos[index] = action.payload;
            }
        } )
        .addCase( deleteTodo.fulfilled, (state, action) => {
            state.todos = state.todos.filter(
                todo => todo.$id !== action.payload
            );
        } )
    },
});

export default todoSlice.reducer;
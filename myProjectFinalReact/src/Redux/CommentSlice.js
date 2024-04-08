import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    comments: [],
    status: 'idle'
}

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://localhost:7025/api/Comment');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removeComments = createAsyncThunk(
    'comments/removeComments',
    async (id, thunkAPI) => {
        try {
            debugger
            await axios.delete(`https://localhost:7025/api/Comment/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postComments = createAsyncThunk(
    'comments/postComments',
    async (commentData, thunkAPI) => {
        debugger
        try {
            const response = await axios.post('https://localhost:7025/api/Comment', commentData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const Commentslice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(removeComments.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(removeComments.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(removeComments.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(postComments.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(postComments.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.comments=[...state.comments,action.payload]

                //state.comments.push(action.payload);
            })
            .addCase(postComments.rejected, (state) => {
                state.status = 'rejected';
            });
    },
});
export const { } = Commentslice.actions;

export default Commentslice.reducer;
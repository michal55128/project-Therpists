import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    category: [],
    status: 'idle'
}

export const fetchCategory = createAsyncThunk(
    'comments/fetchComments',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://localhost:7025/api/Category');
            console.log("response:");
            console.log(response);
            //  debugger
            let pro = response.data
            console.log("prooooooooooooooo");
            console.log(pro);
            //  debugger
            // for (let i = 0; i < pro.length; i++) {
            //     let ther=pro[i].therpists;
            //     console.log(ther);   
            //     for (let j =0; j < ther.length; j++) {
            //         let p = await axios.get(`https://localhost:7025/api/Therpist/getImage/${ther[j].urlImage}`)
            //         ther[j] = { ...ther[j], pic: p.data }
            //     }
            // }
            console.log(pro);
            return pro;


        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }

    }
);


export const removeCategory = createAsyncThunk(
    'category/removeCategory',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`https://localhost:7025/api/Category/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postCategory = createAsyncThunk(
    'category/postCategory',
    async (categoryData) => {
        try {
            // debugger
            const formData = new FormData();
            formData.append('nameCategory', categoryData.nameCategory);

            const response = await axios.post(`https://localhost:7025/api/Category`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
          
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.category = action.payload;
            })
            .addCase(fetchCategory.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(removeCategory.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.category = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(removeCategory.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(postCategory.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(postCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.category.push(action.payload);
                // state.category = [...state.category, action.payload]

                //state.comments.push(action.payload);
            })
            .addCase(postCategory.rejected, (state) => {
                state.status = 'rejected';
            });
    },
});
export const { } = CategorySlice.actions;

export default CategorySlice.reducer;
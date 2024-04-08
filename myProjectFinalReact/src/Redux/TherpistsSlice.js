import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    details: [],
    status: 'idle',
    commentsTherpist: [],
    imgStatus: 'init',
}
export const getDetails = createAsyncThunk(
    'TherpistDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`https://localhost:7025/api/Therpist/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("not Therpist");
                return thunkAPI.rejectWithValue("not Therpist");
            }
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const updateTherpist = createAsyncThunk(
    'Therpist/updateTherpist',
    async (therpist) => {
        try {
            debugger
            const response = await axios.put(`https://localhost:7025/api/Therpist/${therpist.id}`, therpist, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)
export const getAll = createAsyncThunk(
    'Therpist/fetchTherpist',
    async (thunkAPI) => {
        console.log('in fetchGetAll');
        const response = await axios.get('https://localhost:7025/api/Therpist')
        console.log(response);
        return response.data
    },
)
export const getImage = createAsyncThunk(
    'getImage',
    async (therpist) => {
        try {
            const response = await axios.get(`https://localhost:7025/api/Therpist/getImage/${therpist.urlImage.toString()}`)
            const image = { img: response.data, id: therpist.id };
            return image;

        } catch (error) {
            console.log(error);
        }
    }
)
export const fetchTherpist = createAsyncThunk(
    'therpist/fetcTherpist',
    async () => {
        // debugger
        console.log('in fetcTherpist');
        const response = await axios.get('https://localhost:7025/api/Therpist')
        console.log("response:");
        console.log(response);
        let pro = response.data

        // for (let i = 0; i < pro.length; i++) {
        //     let p = await axios.get(`https://localhost:7025/api/Therpist/getImage/${pro[i].urlImage}`)
        //     pro[i] = { ...pro[i], pic: p.data }
        // }
        console.log(pro);
        return pro;
    },
);
export const addTheripstsServer = createAsyncThunk(
    'Therpists/addTheripstsServer',
    async (therpist) => {
        try {
            debugger
            const formData = new FormData();
            formData.append('name', therpist.name);
            formData.append('address', therpist.address);
            formData.append('email', therpist.email);
            formData.append('description', therpist.description);
            formData.append('phone', therpist.phone);
            formData.append('password', therpist.password);
            formData.append('image', therpist.image);
            formData.append('categoriesId', therpist.categoriesId);

            const response = await axios.post(`https://localhost:7025/api/Therpist`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
debugger;
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);



export const TherpistSlice = createSlice({
    name: 'therpist',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.details = action.payload;
                state.commentsTherpist = state.details.comments;
                 console.log('action',action.payload);
                

            })
            .addCase(getDetails.fulfilled, (state, action) => {
                state.status = 'fulfilled';
         
            })
            .addCase(addTheripstsServer.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                // console.log(action.payload);
                state.details = action.payload
                // state.details.push(action.payload);
            })
            .addCase(getImage.fulfilled, (state, action) => {
                state.imgStatus = 'fulfilled'
                state.images.push(action.payload);
            })
            .addCase(fetchTherpist.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.details = action.payload
            })
            .addCase(fetchTherpist.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(fetchTherpist.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateTherpist.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.details = action.payload
            })
            .addCase(updateTherpist.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(updateTherpist.pending, (state) => {
                state.status = 'pending';
            })



    },
}
)
export const { } = TherpistSlice.actions;

export default TherpistSlice.reducer;

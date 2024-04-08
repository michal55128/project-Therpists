import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    patients: [],
    status: 'idle',
    details: {}
}

export const fetchPatient = createAsyncThunk(
    'patient/fetchPatient',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://localhost:7025/api/Patient');
            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            }
            else {
                alert('הסיסמה לא קיימת במאגר')
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removePatient = createAsyncThunk(
    'patient/removePatient',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`https://localhost:7025/api/Patient/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updatePatient = createAsyncThunk(
    'patient/removePatient',
    async (patientDate, thunkAPI) => {
        try {
            debugger
            const patientD={
                id:patientDate.id,
                NameChild: patientDate.NameChild,
                Address: patientDate.Address,
                IdChild: patientDate.IdChild,
                Email: patientDate.Email,
                Phone: patientDate.Phone,
                Password: patientDate.Password,
            }
            const response =  await axios.put(`https://localhost:7025/api/Patient/${patientDate.id}`,patientD);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

  


export const postPatient = createAsyncThunk(
    'patient/postPatient',
    async (patientData, thunkAPI) => {
        debugger
        try {
            const response = await axios.post('https://localhost:7025/api/Patient', patientData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const Patientlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatient.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchPatient.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.patients = action.payload;
            })
            .addCase(fetchPatient.rejected, (state) => {
                state.status = 'rejected';
            })
            // .addCase(removePatient.pending, (state) => {
            //     state.status = 'pending';
            // })
            // .addCase(removePatient.fulfilled, (state, action) => {
            //     state.status = 'fulfilled';
            //     state.patients = state.patients.filter(comment => comment.id !== action.payload);
            // })
            // .addCase(removePatient.rejected, (state) => {
            //     state.status = 'rejected';
            // })
            .addCase(postPatient.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(postPatient.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.patients = [...state.patients, action.payload]

                //state.comments.push(action.payload);
            })
            .addCase(postPatient.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(updatePatient.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.patients = [...state.patients, action.payload]

            })
            .addCase(updatePatient.rejected, (state) => {
                state.status = 'rejected';
            })
    },
});
export const { } = Patientlice.actions;

export default Patientlice.reducer;
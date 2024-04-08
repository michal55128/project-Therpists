// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// const initialState = {
//   isConnect: false,
//   therpist: null,
//   patient: null,
//   alert1: false,
//   typeUser: "therpist",
//   status:'idle',
// };

// export const getByPasswordPatient = createAsyncThunk(
//   "patient/getByPasswordPatient",
//   async (password, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `https://localhost:7025/api/Patient/user/${password}`
//       );
//       if (response.status === 200) {
//         console.log(response.data);
//         return response.data;
//       } else {
//         return null;
//       }
//       console.log("responseData", response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getByPasswordTherpist = createAsyncThunk(
//   "therpist/getByPasswordTherpist",
//   async (password, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `https://localhost:7025/api/Therpist/user/${password}`
//       );
//       if (response.status === 200) {
//         console.log(response.data);
//         return response.data;
//       } else {
//         return null;
//       }
//       console.log("responseData", response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const SigninSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers:{},
//   extraReducers: (builder) => {
//     // builder.addCase(setTherpist.fulfilled, (state, action) => {
//     //   state.therpist = action.payload;
//     // });
//     builder
//       .addCase(getByPasswordPatient.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(getByPasswordPatient.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         state.patient = action.payload;
//         state.typeUser='patient';
//         console.log(action.payload);
//       })
//       .addCase(getByPasswordPatient.rejected, (state) => {
//         state.status = "rejected";
//       })
//       .addCase(getByPasswordTherpist.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(getByPasswordTherpist.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         state.therpist = action.payload;
//         state.typeUser='therpist';
//         console.log(action.payload);
//       })
//       .addCase(getByPasswordTherpist.rejected, (state) => {
//         state.status = "rejected";
//       });
//   },
// });

// // export const { setPatient, setTherpist, setTypeUser } = loginSlice.actions;
// export const {}=SigninSlice.actions;
// // export const { disconnect, connect,setTherpist,setPtient,openAlert } = loginSlice.actions
// export default SigninSlice.reducer;

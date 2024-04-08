import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const initialState = {
  isConnect: false,
  therpist: null,
  patient: null,
  alert1: false,
  typeUser: "",
  status: "idle",
};

export const getByPasswordPatient = createAsyncThunk(
  "patient/getByPasswordPatient",
  async (password, thunkAPI) => {
    try {
      // debugger;
      const response = await axios.get(
        `https://localhost:7025/api/Patient/user/${password}`
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        return null;
      }
      console.log("responseData", response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getByPasswordTherpist = createAsyncThunk(
  "therpist/getByPasswordTherpist",
  async (password, thunkAPI) => {
    try {
      // debugger;
      const response = await axios.get(
        `https://localhost:7025/api/Therpist/user/${password}`
      );
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      } else {
        return null;
      }
      console.log("responseData", response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginInToken = createAsyncThunk(
  "patient/loginInToken",
  async ({ email, password }, thunkAPI) => {
    try {
      debugger
      const response = await axios.post(`https://localhost:7025/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );
      console.log(response.data);
      //טוקן
      debugger
      console.log('sss');
      // Store session data
      sessionStorage.setItem("isLoggedIn", "true");
      document.getElementById("chk").checked = false;
      const token = response.data;
      sessionStorage.setItem("token", token);

      // Decode token and store relevant data in sessionStorage
      const decoded = jwtDecode(token);
      const { nameidentifier, emailaddress, givenname, surname, groupsid } = decoded;
      sessionStorage.setItem("userId", nameidentifier);
      sessionStorage.setItem("userName", givenname);
      sessionStorage.setItem("email", emailaddress);
      sessionStorage.setItem("personId", surname);
      sessionStorage.setItem("amountStories", groupsid);

     debugger

      // Add user details to the initialState
      const user = {
        userId: nameidentifier,
        userName: givenname,
        email: emailaddress,
        personId: surname,
        amountStories: groupsid
      };
      console.log(user);
      return user; // Return user details to be stored in state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const disconnect = createAsyncThunk(
  "therpist/disconnect",
  async (_, thunkAPI) => {
    try {
      debugger;
    } catch {}
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.status = "idle";
      state.typeUser = "";
      state.patient = null;
      state.therpist = null;
    },
  },
  // reducers: {
  //   disconnect: (state) => {
  //     state.isConnect = false;
  //     state.user = null;
  //   },
  //   connect: (state) => {
  //     state.isConnect = true;
  //   },
  //   setTherpist: (state, action) => {
  //     state.therpist = action.payload;
  //     console.log(state.therpist);
  //   },
  //   setTypeUser: (state, action) => {
  //     state.typeUser = action.payload;
  //     console.log(state.typeUser);
  //   },
  //   setPatient: (state, action) => {
  //     state.patient = action.payload;
  //     console.log(state.patient);
  //   },
  //   openAlert: (state, action) => {
  //     state.alert1 = action.payload;
  //     console.log(state.alert1);
  //   },
  // },
  extraReducers: (builder) => {
    // builder.addCase(setTherpist.fulfilled, (state, action) => {
    //   state.therpist = action.payload;
    // });
    builder
      .addCase(getByPasswordPatient.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getByPasswordPatient.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.patient = action.payload;
        state.typeUser = "patient";
        if (action.payload && action.payload.status === 200) {
          state.status = "fulfilled";
          state.patient = action.payload;
          state.typeUser = "patient";
        }
        // console.log(action.payload);
      })
      .addCase(getByPasswordPatient.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getByPasswordTherpist.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getByPasswordTherpist.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.therpist = action.payload;
        state.typeUser = "therpist";
        if (action.payload && action.payload.status === 200) {
          state.status = "fulfilled";
          state.therpist = action.payload;
          state.typeUser = "therpist";
        }
        // console.log(action.payload);
      })
      .addCase(getByPasswordTherpist.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(disconnect.fulfilled, (state) => {
        state.status = "idle";
        state.typeUser = "";
        state.patient = null;
        state.therpist = null;
      });
  },
});

// export const { setPatient, setTherpist, setTypeUser } = loginSlice.actions;
export const { logout } = loginSlice.actions;

// export const { disconnect, connect,setTherpist,setPtient,openAlert } = loginSlice.actions
export default loginSlice.reducer;

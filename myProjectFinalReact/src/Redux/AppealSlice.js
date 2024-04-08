import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appeals: [],
  status: "idle",
};

export const fetchAppeals = createAsyncThunk(
  "appeals/fetchAppeals",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://localhost:7025/api/Appeal");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeAppeals = createAsyncThunk(
  "appeals/removeAppeals",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`https://localhost:7025/api/Appeal/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postAppeals = createAsyncThunk(
  "appeals/postComments",
  async (appealtData, thunkAPI) => {
    debugger
    try {
      const response = await axios.post(
        "https://localhost:7025/api/Appeal",
        appealtData
      );
      debugger
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAppeals = createAsyncThunk(
  "appeals/updateAppeals",
  async (appealtData, thunkAPI) => {
    debugger
    const t = {
      id: appealtData.id,
      question: appealtData.question,
      answer: appealtData.answer,
      therpistId: appealtData.therpistId,
      patientId: appealtData.patientId,
      namePatient:appealtData.namePatient,
      date: "2024-03-10T23:41:11.052",
    };
    const response = await axios.put(
      `https://localhost:7025/api/Appeal/${appealtData.id}`,t);
    return response.data;
  }
);

export const AppealSlice = createSlice({
  name: "appeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppeals.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAppeals.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.appeals = action.payload;
      })
      .addCase(fetchAppeals.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(removeAppeals.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeAppeals.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.appeals = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(removeAppeals.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(postAppeals.pending, (state) => {
        state.status = "pending";
      })
      .addCase(postAppeals.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.appeals = [...state.appeals, action.payload];
      })
      .addCase(postAppeals.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateAppeals.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateAppeals.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.appeals = [...state.appeals, action.payload];
      })
      .addCase(updateAppeals.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const {} = AppealSlice.actions;

export default AppealSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GW_URL } from '../config';

const initialState = {
  PTMnotificationList: [],
  isLoading: false,
  error: null,
  count: 0,
};

// Create async thunk for /parents/:parent_id/getPTMNotification API
export const fetchPTMContent = createAsyncThunk(
  'content/fetchPTMContent',
  async ({ parentId, parentConfig }, thunkAPI) => {
    console.log(17, parentId);
    const res = await axios(`${GW_URL}/parents/${parentId}/getPTMNotification`, parentConfig);
    const data = await res.data;

    return data;
  }
);


const counterSlice = createSlice({
  name: 'PTMnotificationList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPTMContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPTMContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.PTMnotificationList = action.payload;
    
      state.count = action.payload.notifications.filter((item) => {
        return item.is_seen === false;
      }).length;
    });
    builder.addCase(fetchPTMContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { renderPTMNotificationList } = counterSlice.actions;
export default counterSlice.reducer;

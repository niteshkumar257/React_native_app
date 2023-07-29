import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { GW_URL } from '../config';

const initialState = {
 generalNotificationList:[],
 isLoading:false,
error:null,
 count:0
};

export const GeneralNotificationFetchContent = createAsyncThunk(
  'content/GeneratlNotificationFetchContent',
  async (state,action) => {
   
    const res = await axios(`${GW_URL}/schools/${school_id}/GeneralNotification`)
    const data = await res.data;
  
    return data
  }
)
const counterSlice = createSlice({
  name: 'GeneralNotificatinList',
  initialState,
  reducers:{},
  extraReducers:(builder) => {

    builder.addCase(GeneralNotificationFetchContent.pending, (state) => {
    
      state.isLoading = true;
    })
    builder.addCase(GeneralNotificationFetchContent.fulfilled, (state, action) => {
  
     
      state.isLoading = false
      state.generalNotificationList = action.payload
      state.count=action.payload.messages.filter(item=> {
          return item.is_seen===false;
        }).length 
      
        
    })
    builder.addCase(GeneralNotificationFetchContent.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
});

export const { renderGeneralNotificationList} = counterSlice.actions;
export default counterSlice.reducer;
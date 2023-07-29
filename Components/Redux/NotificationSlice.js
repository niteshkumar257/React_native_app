import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { GW_URL } from '../config';


const initialState = {
 notificationList:[],
 isLoading:false,
error:null,
 count:0
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ parentId, parentConfig }, thunkAPI) => {
    console.log(parentConfig);
   
    const res = await axios(`${GW_URL}/parents/${parentId}/getNotification`,parentConfig)
    const data = await res.data;
  
    return data
  }
)
const counterSlice = createSlice({
  name: 'notificationList',
  initialState,
  reducers:{},
  extraReducers:(builder) => {

    builder.addCase(fetchContent.pending, (state) => {
    
      state.isLoading = true;
    })
    builder.addCase(fetchContent.fulfilled, (state, action) => {
  
     
      state.isLoading = false
      state.notificationList = action.payload
      state.count=action.payload.messages.filter(item=> {
          return item.is_seen===false;
        }).length 
      
        
    })
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
  
});

export const { renderNotificationList} = counterSlice.actions;
export default counterSlice.reducer;
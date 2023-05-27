import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 notificationList:[],
 count:0
};

const counterSlice = createSlice({
  name: 'notificationList',
  initialState,
  reducers:{
    renderNotificationList(state,action)
    {

        state.notificationList= action.payload.sort((a, b) => {
            const dateA = new Date(a.created_on);
            const dateB = new Date(b.created_on);
          
            if (dateA < dateB) return 1;
            if (dateA > dateB) return -1;
          
            // Dates are the same
            if (!a.is_seen && b.is_seen) return -1;
            if (a.is_seen && !b.is_seen) return 1;
          
            return 0;
          })
       
         state.count=state.notificationList?.filter(item=> {
            return item.is_seen===false;
          }).length;
    },
   
  }
});

export const { renderNotificationList} = counterSlice.actions;
export default counterSlice.reducer;
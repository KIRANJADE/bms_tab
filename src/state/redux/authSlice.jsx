import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
    loginData : [],
    users : []
}

  export const loginSlice = createSlice({
        name : "login",
        initialState : INTIAL_STATE,
        reducers : {
            adminLogin : (state,action) => {
                state.adminData = action.payload
            },
            userListData : (state,action) => {
                state.users = action.payload
                console.log(action.payload,"action.payload",state.users?.userDetails);
                
            },
        }
  })

export const {adminLogin,userListData} = loginSlice.actions;
export default loginSlice.reducer
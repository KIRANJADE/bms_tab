import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
    loginData : [],
    users : [],
    addUser : false,
    userDelete : false,
    committeeData : [],
    addUser : {}
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
                console.log(action.payload,"action.payload",state.users);
                
            },
         
            userCreate : (state,action) => {
                state.addUser = action.payload
            },
            deleteUser : (state,action) => {
                state.userDelete = action.payload
            },
            committeeListData : (state,action) => {
                state.committeeData = action.payload
                
                
            },
        }
  })

export const {adminLogin,userListData,userCreate,deleteUser, committeeListData} = loginSlice.actions;
export default loginSlice.reducer
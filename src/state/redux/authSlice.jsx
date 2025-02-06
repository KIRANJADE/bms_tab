import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
    loginData : [],
    users : [],
    addUser : false,
    userDelete : false,
    committeeData : [],
    adminData : [],
    committeData : [],
    committeId: []
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
            administratorData : (state,action) => {
                state.adminData = action.payload
            },
            committeCommonData : (state,action) => {
                state.committeData = action.payload
            },
            committeebyId : (state,action) => {
                state.committeId = action.payload
            },
        }
  })

export const {adminLogin,userListData,userCreate,deleteUser, committeeListData,administratorData,committeCommonData,committeebyId} = loginSlice.actions;
export default loginSlice.reducer
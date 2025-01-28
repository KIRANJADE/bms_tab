import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
    loginData : [],
    users : [],
    addUser : false,
    userDelete : false,
    committeeData : [],
    adminData : []
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
            }
        }
  })

export const {adminLogin,userListData,userCreate,deleteUser, committeeListData,administratorData} = loginSlice.actions;
export default loginSlice.reducer
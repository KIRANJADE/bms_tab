import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
    loginData : [],
    users : [],
    addUser : false,
    userDelete : false
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
            }
        }
  })

export const {adminLogin,userListData,userCreate,deleteUser} = loginSlice.actions;
export default loginSlice.reducer
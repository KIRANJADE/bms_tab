import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
    loginData : [],
}

  export const loginSlice = createSlice({
        name : "login",
        initialState : INTIAL_STATE,
        reducers : {
            adminLogin : (state,action) => {
                state.adminData = action.payload
            }
        }
  })

export const {adminLogin} = loginSlice.actions;
export default loginSlice.reducer
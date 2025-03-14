import { createSlice } from "@reduxjs/toolkit";

const INTIAL_STATE = {
    loginData : [],
    users : [],
    addUser : false,
    userDelete : false,
    committeeData : [],
    adminData : [],
    committeData : [],
    committeId: [],
    chanthaData : [],
    eventsData: [],
    eventsId : [],
    notificationData : [],
    deathData: [],
    memberListData : [],
    memberSearchData : [],
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
            chanthaList : (state,action) => {
                state.chanthaData = action.payload
            },
            eventsList : (state,action) => {
                state.eventsData = action.payload
            },
            eventById : (state,action) => {
                state.eventsId = action.payload
            },
            notify : (state,action) => {
                state.notificationData = action.payload
            },
            death : (state,action) => {
                state.deathData = action.payload
            },
            memberData : (state,action) => {
                state.memberListData = action.payload
            },
            familyListData : (state,action) => {
                state.familyData = action.payload
            },
            familyCreate : (state,action) => {
                state.addUser = action.payload
            },
            searchMembers : (state,action) => {
                state.memberSearchData = action.payload
            },
        }
  })

export const {adminLogin,userListData,userCreate,deleteUser, committeeListData,
    administratorData,committeCommonData,committeebyId,chanthaList, eventsList, eventById, notify, death, memberData, searchMembers, familyListData,familyCreate } = loginSlice.actions;
export default loginSlice.reducer
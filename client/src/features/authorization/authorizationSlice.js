import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthorizeContract from "../../contracts/Authorize.json";
import authorizationServices from "./authorizationServices";
import managerServices from "../manager/managerServices";
import globalServices from '../global/globalServices';

const initialState = {
  userRole: []
};

export const setRolePatient = createAsyncThunk(
  "authorization/setRolePatient",
  async (payload) => {
    const {web3, accounts, currentUser} = payload;
    return await authorizationServices.handleSetRole(
      {web3, accounts, currentUser},
      AuthorizeContract
    );
  }
);

export const setRoleManager = createAsyncThunk(
  "authorization/setRoleManager",
  async (payload) => {
    const params = payload;
    const managerService = new managerServices(params);
    const data = await managerService.updateRole();
    return data;
  }
);

export const getCurrentUserRole = createAsyncThunk(
  "authorization/getCurrentUserRole",
  async (payload) => {
    const params = payload;
    const globalService = new globalServices(params);
    const data = await globalService.getRole();
    return data;
  }
);

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRoleManager.fulfilled, (state, action) => {
        console.log(action.payload);
        alert("Successfully update manager role for account");
      })
      .addCase(setRoleManager.rejected, (state, action) => {
        console.log(action.error.message);
        alert(action.error.message);
      })
      .addCase(getCurrentUserRole.fulfilled, (state, action) => {
        if(action.payload[0] === '1') {
          state.userRole.push(process.env.REACT_APP_ROLE_PATIENT);
        }
        if(action.payload[1] === '1') {
          state.userRole.push(process.env.REACT_APP_ROLE_DOCTOR);
        }
        if(action.payload[2] === '1') {
          state.userRole.push(process.env.REACT_APP_ROLE_MANAGER);
        }
        if(action.payload[3] === '1') {
          state.userRole.push(process.env.REACT_APP_ROLE_ADMIN);
        }
        console.log(`Current user role: ${state.userRole}`);
      });
  },
});

export const {resetState} = authorizationSlice.actions;

export const authorizationState = (state) => state.authorization;

export default authorizationSlice.reducer;

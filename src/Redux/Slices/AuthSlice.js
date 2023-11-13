import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js";
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    try {
      
        const res = axiosInstance.post("user/register", data);
        console.log(`${res} , res`);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        
        // console.log("auth slice",res)
        return (await res).data;
    }catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async(data) => {
    try {
        let res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! Authentication in progress ...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        res = await res;
        return res.data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress ...",success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
       
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action.payload.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
    }
});

// function to fetch user data
export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      return res?.data;
    } catch (error) {
      toast.error(error.message);
    }
  });

export default authSlice.reducer;

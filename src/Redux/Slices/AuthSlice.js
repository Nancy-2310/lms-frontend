import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js";
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") != undefined ? JSON.parse(localStorage.getItem("data")) : {}
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
        // for user details
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) 
                return;
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
        });
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

  // function to change user password
export const changePassword = createAsyncThunk(
    "/auth/changePassword",
    async (userPassword) => {
      try {
        let res = axiosInstance.post("/user/change-password", userPassword);
  
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to change password",
        });
  
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
// function to update user profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      let res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);

      toast.promise(res, {
        loading: "Updating...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export default authSlice.reducer;
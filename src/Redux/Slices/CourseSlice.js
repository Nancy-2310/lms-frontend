import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try{
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "Loading course data ...",
            success: "Courses loaded successully",
            error: "Failed to get the course",
        });

        return (await response).data.courses;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload){
                state.courseData = [ ...action.payload];
            }
        })
    }
});


// function to create a new course
export const createNewCourse = createAsyncThunk(
    "/post/courses",
    async (data) => {
      try {
        // creating the form data from user data
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
  
        const res = axiosInstance.post("/courses", formData);
  
        toast.promise(res, {
          loading: "Creating the course...",
          success: "Course created successfully",
          error: "Failed to create course",
        });
  
        const response = await res;
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );
  
// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res = axiosInstance.delete(`courses/${id}`);

    toast.promise(res, {
      loading: "Deleting the course...",
      success: "Courses deleted successfully",
      error: "Failed to delete course",
    });

    const response = await res;

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export default courseSlice.reducer;
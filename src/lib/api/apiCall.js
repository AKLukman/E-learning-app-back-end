import axios from "axios";
import { server_url } from "../data";
import { create } from "zustand";
import { storeCourses } from "./store";
import { axiosInstance } from "./axiosInstance";
import { toast } from "react-hot-toast";

export const addMileStone = async (courseId, body) => {
  try {
    const res = await axiosInstance.post(
      `/courses/${courseId}/milestones`,
      body
    );
    if (res.status >= 201) {
      toast.success("MileStone Add Successfully", {
        position: "top-center",
        duration: 1500,
      });
    }
  } catch (error) {
    toast.error("An error occurred", {
      position: "top-center",
      duration: 1500,
    });
  }
};

export const getCourseById = create((set) => ({
  isLoading: false,
  course: null,
  fetchData: async (courseId) => {
    const url = `${server_url}/courses/${courseId}`;
    set({ isLoading: true });
    try {
      const res = await axios.get(url);
      set({ course: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

// export { addCourse, getCourses };

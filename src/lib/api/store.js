import { create } from "zustand";
import { axiosInstance } from "./axiosInstance";
import { toast } from "react-hot-toast";
import { cloud_front_url } from "../data";

export const storeCourses = create((set) => ({
  isLoading: false,
  courses: [],
  milestones: [],
  modules: [],
  getCourses: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/courses/admin");
      set({ courses: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addCourse: async (body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/courses", body);
      set((state) => ({ courses: [...state?.courses, res?.data] }));
      set({ isLoading: false });

        // Log the added course data to the console
        console.log("Added Course:", res.data);
        
      if (res.status >= 200 && res.status < 300)
    
        toast.success("Course Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateCourse: async (courseId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/courses/${courseId}`, body);

      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === courseId ? res.data : course
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Course Update Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteCourse: async (courseId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(`/courses/${courseId}`);
      console.log(res.data);
      set((state) => ({
        courses: state.courses.filter((course) => course._id !== courseId),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Course Remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  getMilestones: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/milestones");
      set({ milestones: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addMileStone: async (courseId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(
        `/milestone/course/${courseId}`,
        body
      );

      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === courseId
            ? { ...course, milestones: [...course.milestones, res.data] }
            : course
        ),
      }));
      set((state) => ({ milestones: [...state?.milestones, res?.data] }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Milestone Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateMileStone: async (mileStoneId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/milestone/${mileStoneId}`, body);
      set((state) => ({
        milestones: state.milestones.map((milestone) =>
          milestone._id === mileStoneId ? res.data : milestone
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Milestone Update Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteMileStone: async (courseId, mileStoneId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(
        `/milestone/${mileStoneId}/course/${courseId}`
      );

      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === courseId
            ? {
                ...course,
                milestones: course.milestones.filter(
                  (milestone) => milestone?._id !== mileStoneId
                ),
              }
            : course
        ),
      }));
      set((state) => ({
        milestones: state.milestones.filter(
          (milestone) => milestone._id !== mileStoneId
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Milestone Remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addModule: async (mileStoneId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(
        `/module/milestone/${mileStoneId}/`,
        body
      );
      set((state) => ({
        milestones: state.milestones.map((milestone) =>
          milestone._id === mileStoneId
            ? { ...milestone, modules: [...milestone.modules, res.data] }
            : milestone
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Module Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateModule: async (moduleId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/module/${moduleId}`, body);

      if (res.status >= 200 && res.status < 300)
        toast.success("Module Update Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteModule: async (mileStoneId, moduleId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(
        `/module/${moduleId}/milestone/${mileStoneId}`
      );
      set((state) => ({
        milestones: state.milestones.map((milestone) =>
          milestone._id === mileStoneId
            ? {
                ...milestone,
                modules: milestone.modules.filter(
                  (modulef) => modulef?._id !== moduleId
                ),
              }
            : milestone
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Module remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  getModules: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/modules");
      set({ modules: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addClass: async (moduleId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/class/module/${moduleId}`, body);
      set((state) => ({
        modules: state.modules.map((module) =>
          module._id === moduleId
            ? { ...module, classes: [...module.classes, res.data] }
            : module
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Class Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateClass: async (classId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/class/${classId}`, body);
      if (res.status >= 200 && res.status < 300)
        toast.success("Class Update Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteClass: async (moduleId, classId) => {
    console.log("🚀 ~ file: store.js:291 ~ deleteClass: ~ classId:", classId);
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(
        `/class/${classId}/module/${moduleId}`
      );

      set((state) => ({
        modules: state.modules.map((module) =>
          module._id === moduleId
            ? {
                ...module,
                classes: module.classes.filter(
                  (classI) => classI?._id !== classId
                ),
              }
            : module
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Class remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addQuiz: async (moduleId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/quiz/module/${moduleId}`, body);
      set((state) => ({
        modules: state.modules.map((module) =>
          module._id === moduleId
            ? { ...module, quiz: [...module.quiz, res.data] }
            : module
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Quiz Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteQuiz: async (moduleId, quizID) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(
        `/quiz/${quizID}/module/${moduleId}`
      );

      set((state) => ({
        modules: state.modules.map((module) =>
          module._id === moduleId
            ? {
                ...module,
                quiz: module.quiz.filter((quizI) => quizI?._id !== quizID),
              }
            : module
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Quiz remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addBlog: async (courseId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/courses/${courseId}/blogs`, body);
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === courseId ? res.data : course
        ),
      }));

      if (res.status >= 200 && res.status < 300)
        toast.success("Quiz Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  removeBlog: async (courseId, blogId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(
        `/courses/${courseId}/blogs/${blogId}`
      );
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === courseId
            ? {
                ...course,
                blogs: course.blogs.filter((blog) => blog?._id !== blogId),
              }
            : course
        ),
      }));

      if (res.status >= 200 && res.status < 300)
        toast.success("Quiz Remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addFaq: async (courseId, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/courses/${courseId}/faqs`, body);
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === courseId ? res.data : course
        ),
      }));

      if (res.status >= 200 && res.status < 300)
        toast.success("Faq Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  removeFaq: async (courseId, faqId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(
        `/courses/${courseId}/faqs/${faqId}`
      );
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === courseId
            ? {
                ...course,
                faq: course.faq.filter((faqI) => faqI?._id !== faqId),
              }
            : course
        ),
      }));

      if (res.status >= 200 && res.status < 300)
        toast.success("Faq Remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export const storeCategory = create((set) => ({
  isLoading: false,
  categories: [],
  addCategory: async (body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/category", body);
      set((state) => ({ categories: [...state?.categories, res?.data] }));
      set({ isLoading: false });
      if (res.status >= 200 && res.status < 300)
        toast.success("Category Added Succesfully", {
          position: "top-center",
          duration: 1500,
        });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  getCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/category");
      set({ categories: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateCategory: async (id, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/category/${id}`, body);
      set((state) => ({
        categories: state.categories.map((category) =>
          category._id === id ? res.data : category
        ),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Category Update Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  removeCategory: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(`/category/${id}`);

      set((state) => ({
        categories: state.categories.filter((category) => category._id !== id),
      }));
      if (res.status >= 200 && res.status < 300)
        toast.success("Category Remove Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
export const useUserAuth = create((set) => ({
  isLoading: false,
  teachersAndBloggers: [],
  getTeachersAndBloggers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/teachers-bloggers");
      set({ teachersAndBloggers: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addTeachersAndBlogger: async (body) => {
    const { email, password, name, image } = body;
    const firebaseBody = {
      email,
      password,
      displayName: name,
      ...(image && { photoURL: `${cloud_front_url}/${image}` }),
    };

    set({ isLoading: true });
    try {
      const { password, ...restData } = body;
      const userResponse = await axiosInstance.post("/user", restData); // User post request

      if (userResponse?.status === 201) {
        const { _id } = userResponse?.data;

        const firebaseResponse = await axiosInstance.post(
          "/register-user",
          { ...firebaseBody, uid: _id } // Include the _id obtained from user post response
        );

        if (firebaseResponse.status >= 200 && firebaseResponse.status < 300) {
          set((state) => ({
            teachersAndBloggers: [
              ...state?.teachersAndBloggers,
              userResponse?.data,
            ],
          }));

          toast.success("Account Created Successfully", {
            position: "top-center",
            duration: 1500,
            icon: "😁",
          });
        }
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteTeachersAndBlogger: async (id) => {
    set({ isLoading: true });
    try {
      const firebaseResponse = await axiosInstance.delete(
        `/firebase-user/${id}`
      );
      if (firebaseResponse.status === 200) {
        const userResponse = await axiosInstance.delete(`/user/${id}`);
        if (userResponse.data) {
          set((state) => ({
            teachersAndBloggers: state.teachersAndBloggers.filter(
              (teachersAndBlogger) => teachersAndBlogger._id !== id
            ),
          }));
          toast.success("User Deleted Succesfully", {
            position: "top-center",
            duration: 1500,
          });
        }
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateTeachersAndBlogger: async (id, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/user/${id}`, body);

      if (res.status >= 200 && res.status < 300) {
        const { name, image } = body;
        const firebaseBody = {
          displayName: name,
          photoURL: `${cloud_front_url}/${image}`,
        };
        const firebaseResponse = await axiosInstance.put(
          `/firebase-user/${id}`,
          firebaseBody
        );
        if (firebaseResponse.status >= 200 && firebaseResponse.status < 300) {
          toast.success("User Info Update", {
            position: "top-center",
            duration: 1500,
          });
          set((state) => ({
            teachersAndBloggers: state.teachersAndBloggers.map(
              (teachersAndBlogger) =>
                teachersAndBlogger._id === id ? res?.data : teachersAndBlogger
            ),
          }));
        }
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updatePassword: async (id, body) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(
        `/firebase-user-password/${id}`,
        body
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success("Password Update Succesfully", {
          position: "top-center",
          duration: 1500,
        });
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export const useCounter = create((set) => ({
  counter: [],
  totalCoursesDeatils: [],
  isLoading: false,
  getCounter: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/chartData");
      set({ counter: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  getAllCoursesDetails: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/total-count");
      set({ totalCoursesDeatils: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

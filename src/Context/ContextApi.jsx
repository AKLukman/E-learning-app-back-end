// ContextProvider.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { axiosInstance } from "../lib/api/axiosInstance";

export const ContextApi = createContext();

const auth = getAuth(app);

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) => console.error("Persistence error:", error));
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        try {
          const res = await axiosInstance.get(`/user/${currentUser.email}`);
          setUserRole(res.data?.role); // Directly setting role in state
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUserRole(null); // Reset role on sign out
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async ({ email, password }) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Fetch user role from backend in signIn as well
      const res = await axiosInstance.get(`/user/${email}`);
      setUserRole(res.data?.role);
      navigateBasedOnRole(res.data?.role);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/");
        break;
      case "teacher":
        navigate("/course");
        break;
      case "blogger":
        navigate("/blogs-&-faq");
        break;
      default:
        navigate("/signin");
    }
  };

  const handleAuthError = (error) => {
    toast.error(error?.message || "An error occurred", {
      position: "top-center",
      duration: 1500,
    });
  };

  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email", {
        position: "top-center",
        duration: 1500,
      });
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUserRole(null); // Ensure user role is cleared on sign out
      navigate("/signin");
    } catch (error) {
      handleAuthError(error);
    }
  };

  return (
    <ContextApi.Provider value={{ user, userRole, loading, signIn, logOut, resetPassword }}>
      {!loading && children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;

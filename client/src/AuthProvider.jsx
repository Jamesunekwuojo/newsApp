import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import api from "./services/api.js";
import Swal from "sweetalert2";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usermail, setUsermail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user");
      try {
        const response = await api.get("/auth/check", {
          withCredentials: true,
        });
        console.log("Response:", response);
        if (response.status === 200) {
          console.log("User data:", response.data.user);

          setUsermail(response?.data?.user?.email);
          console.log("User email", response?.data?.user?.email);

          setUser(response.data.user);
        } else {
          console.log("No user data received");
          setUser(null);
          setUsermail(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setUsermail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signup = async (formData) => {
    try {
      const response = await api.post("/api/admin/signup", formData);

      if (response.status === 200) {
        setUser(response.data.user);

        Swal.fire({
          title: "Welcome",
          text: "Successfully signed up",
          icon: "success",
          confirmButtonText: "Ok",
        });
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || "Signup failed",
        };
      }
    } catch (error) {
      console.error("Error signing up:", error.response || error);
      Swal.fire({
        title: "Error Signing up",
        text: error.response?.data?.error || "Error signing up",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      const response = await api.post("/api/admin/login", formData);

      if (response.status === 200) {
        setUser(response.data.user);
        Swal.fire({
          title: "Success",
          text: "Logged in successful",
          icon: "success",
          confirmButtonText: "Ok",
        });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.error || "Error logging in...",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.delete("/api/admin/logout", {}); // Ensure cookies are cleared
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

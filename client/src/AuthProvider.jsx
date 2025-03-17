import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import api from "./services/api.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/check"); // Include cookies
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Signup function
  const signup = async (formData) => {
    try {
      const response = await api.post("/api/admin/signup", formData);

      if (response.status === 200) {
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, message: response.data.message || "Signup failed" };
      }
    } catch (error) {
      console.error("Error signing up:", error.response || error);
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Login function
  const login = async (formData) => {
    try {
      const response = await api.post("/api/admin/login", formData);

      if (response.status === 200) {
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/api/admin/logout", {}, ); // Ensure cookies are cleared
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

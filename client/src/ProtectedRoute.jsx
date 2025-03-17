import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./services/api";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` means still checking
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/check"); // Endpoint to verify session
        if (response.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      Swal.fire({
        title: "Sign in to continue",
        text: "You need to be signed in to access this page.",
        icon: "warning",
        confirmButtonText: "Log in"
      }).then((result) => {
        if (result.isConfirmed) {
          setShouldRedirect(true);
        }
      });
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Show a loading state while checking auth
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

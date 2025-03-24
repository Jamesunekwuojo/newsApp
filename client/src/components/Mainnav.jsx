import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../customHook/useAuth";

const Mainnav = () => {
  const { user, usermail, logout } = useAuth();
  console.log("Useremail", usermail);

  // let username;
  

  let parts = usermail.split("@");

  const username = parts[0];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-gray-800 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-orange-500" />
            <Link to="/" className="text-xl font-bold text-orange-500">
              UsersHub
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex flex-col  items-center">
                  <h3 className="text-white">Welcome {username}</h3>
                  <h3></h3>
                </div>
              </>
            ) : (
              <></>
            )}
            <Link
              to="/"
              className="text-sm font-medium text-orange-400 hover:text-orange-500"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link to="/login">
                  <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 rounded-md bg-orange-500 cursor-pointer text-white hover:bg-orange-600"
                  >
                    Logout
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-sm px-4 py-2 rounded-md bg-orange-500 cursor-pointer text-white hover:bg-orange-600">
                    Login
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Mainnav;

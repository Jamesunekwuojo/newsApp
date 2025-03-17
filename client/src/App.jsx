import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import NewsDetail from "./components/NewsDetail.jsx";
import NewsList from "./components/NewsList.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Mainnav from "./components/Mainnav.jsx";


const App = () => (
  <div className="flex min-h-screen flex-col ">
    {/* <Mainnav/> */}

    <Router>
      <Mainnav/>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newslist" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>

    {/* <Footer/> */}
  </div>
);

export default App;

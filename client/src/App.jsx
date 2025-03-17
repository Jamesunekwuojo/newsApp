import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import NewsDetail from "./components/NewsDetail.jsx";
import NewsList from "./components/NewsList.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

// import ProtectedRoute from "./ProtectedRoute.jsx";

const App = () => (
  <div className="flex min-h-screen flex-col ">
    {/* <Mainnav/> */}

    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Homepage />} />
        <Route path="/login" element={<AdminPanel />} />
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

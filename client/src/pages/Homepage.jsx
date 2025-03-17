import NewsList from "../components/NewsList.jsx";

import AdminPanel from "../components/AdminPanel.jsx";

import WelcomeMsg from "../components/WelcomeMsg.jsx";

const Homepage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-6">

      <WelcomeMsg/>
     

        

        {/* <NewsList/> */}
        <AdminPanel/>

    </div>
  )
};

export default Homepage;

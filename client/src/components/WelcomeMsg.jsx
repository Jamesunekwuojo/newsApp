import { Link } from "react-router-dom";

const WelcomeMsg = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-6">
      <div className="flex-row items-center justify-center bg-blue-50 p-6">
        <h2 className="text-center text-5xl font-bold ">
          Hello Welcome to Zavod newslist
        </h2>
      </div>

      <div className="flex flex-row items-center">
        <Link to="/admin">
          <button className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer p-4 mx-4 my-4">
            Create News
          </button>
        </Link>

        <Link to="/newslist">
          <button className="bg-blue-600 cursor-pointer text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition p-4 mx-4 my-4">
            View News
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeMsg;

// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { Link } from "react-router-dom";

// const NewsList = () => {
//   const [news, setNews] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const fetchNews = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get(`/api/news?page=${page}&limit=3`);
//       console.log("Data fetched", data);
//       setNews((prev) => [...prev, ...data.news]);
//     } catch (err) {
//       console.error("Error fetching news", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchNews();
//   }, [page]);

//   const loadMore = () => setPage((prev) => prev + 1);

//   return (
//     <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
//       <h2 className="text-4xl font-bold text-orange-500 mb-6">Latest News</h2>
//       <div className="w-full max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {news.map((item) => (
//           <div key={item._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//             <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h5 className="text-xl font-semibold text-orange-400">{item.title}</h5>
//               <Link to={`/news/${item._id}`} className="inline-block mt-2 text-orange-500 hover:underline">
//                 Read More
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//       {loading && <p className="text-orange-400 mt-4">Loading...</p>}
//       <button 
//         className="mt-6 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
//         onClick={loadMore}
//       >
//         Load More
//       </button>
//     </div>
//   );
// };

// export default NewsList;


// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";

// const NewsList = () => {
//   const [news, setNews] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const fetchNews = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get(`/api/news?page=${page}&limit=3`);
//       console.log("Data fetched", data);
//       setNews((prev) => [...prev, ...data.news]);
//     } catch (err) {
//       console.error("Error fetching news", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchNews();
//   }, [page]);

//   const loadMore = () => setPage((prev) => prev + 1);

//   const handleLike = async (id, currentLikes) => {
//     try {
//       const { data } = await api.post(`/api/news/${id}/like`);
//       setNews((prev) =>
//         prev.map((item) =>
//           item._id === id ? { ...item, likes: data.likes } : item
//         )
//       );
//     } catch (err) {
//       console.error("Error liking news", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
//       <h2 className="text-4xl font-bold text-orange-500 mb-6">Latest News</h2>
//       <div className="w-full max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {news.map((item) => (
//           <div key={item._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//             <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h5 className="text-xl font-semibold text-orange-400">{item.title}</h5>
//               <Link to={`/news/${item._id}`} className="inline-block mt-2 text-orange-500 hover:underline">
//                 Read More
//               </Link>
//               <div className="flex items-center mt-3">
//                 <button 
//                   className="flex items-center space-x-1 text-orange-400 hover:text-orange-500"
//                   onClick={() => handleLike(item._id, item.likes)}
//                 >
//                   <Heart className="w-5 h-5" />
//                   <span>{item.likes || 0}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {loading && <p className="text-orange-400 mt-4">Loading...</p>}
//       <button 
//         className="mt-6 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
//         onClick={loadMore}
//       >
//         Load More
//       </button>
//     </div>
//   );
// };

// export default NewsList;

// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";

// const NewsList = () => {
//   const [news, setNews] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [likedNews, setLikedNews] = useState({}); // Track liked state per news item

//   const fetchNews = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get(`/api/news?page=${page}&limit=3`);
//       setNews((prev) => [...prev, ...data.news]);

//       // Initialize likedNews state based on API response
//       const likesState = data.news.reduce((acc, item) => {
//         acc[item._id] = item.likedByUser || false; // Backend should send this
//         return acc;
//       }, {});
//       setLikedNews((prev) => ({ ...prev, ...likesState }));
//     } catch (err) {
//       console.error("Error fetching news", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchNews();
//   }, [page]);

//   const loadMore = () => setPage((prev) => prev + 1);

//   const handleLikeToggle = async (id, isLiked) => {
//     try {
//       const { data } = await api.post(`/api/news/${id}/like`, {
//         action: isLiked ? "unlike" : "like",
//       });

//       setNews((prev) =>
//         prev.map((item) =>
//           item._id === id ? { ...item, likes: data.likes } : item
//         )
//       );

//       setLikedNews((prev) => ({
//         ...prev,
//         [id]: !isLiked, // Toggle liked state
//       }));
//     } catch (err) {
//       console.error("Error liking/unliking news", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
//       <h2 className="text-4xl font-bold text-orange-500 mb-6">Latest News</h2>
//       <div className="w-full max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {news.map((item) => (
//           <div key={item._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//             <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h5 className="text-xl font-semibold text-orange-400">{item.title}</h5>
//               <Link to={`/news/${item._id}`} className="inline-block mt-2 text-orange-500 hover:underline">
//                 Read More
//               </Link>
//               <div className="flex items-center mt-3">
//                 <button 
//                   className={`flex items-center space-x-1 ${
//                     likedNews[item._id] ? "text-red-500" : "text-orange-400"
//                   } hover:text-orange-500`}
//                   onClick={() => handleLikeToggle(item._id, likedNews[item._id])}
//                 >
//                   <Heart className="w-5 h-5" fill={likedNews[item._id] ? "red" : "none"} />
//                   <span>{item.likes || 0}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {loading && <p className="text-orange-400 mt-4">Loading...</p>}
//       <button 
//         className="mt-6 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
//         onClick={loadMore}
//       >
//         Load More
//       </button>
//     </div>
//   );
// };

// export default NewsList;




import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {useAuth} from "../customHook/useAuth.jsx"

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get logged-in user info

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/news?page=${page}&limit=3`);
      setNews((prev) => [...prev, ...data.news]);
    } catch (err) {
      console.error("Error fetching news", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await api.delete(`/api/news/${id}`);
      setNews((prev) => prev.filter((item) => item._id !== id)); // Remove from UI
    } catch (err) {
      console.error("Error deleting news", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-orange-500 mb-6">Latest News</h2>
      <div className="w-full max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div key={item._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h5 className="text-xl font-semibold text-orange-400">{item.title}</h5>
              <Link to={`/news/${item._id}`} className="inline-block mt-2 text-orange-500 hover:underline">
                Read More
              </Link>
              {/* Show delete button only if the logged-in user is the author */}
              {user && user.id === item.postedBy && (
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-orange-400 mt-4">Loading...</p>}
      <button 
        className="mt-6 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
        onClick={loadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default NewsList;



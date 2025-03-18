// import { useState, useEffect } from "react";
// import api from "../services/api";
// import { Link } from "react-router-dom";




// const NewsList = () => {
//     const [news, setNews] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
  
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const { data } = await api.get(`/api/news?page=${page}&limit=3`);
//         console.log("Data fetched", data)
//         const news= data.news
//         setNews(prev => [...prev, ...news]);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching news', err);
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       fetchNews();
//     }, [page]);
  
//     const loadMore = () => setPage(prev => prev + 1);
  
//     return (
//       <div className="container mt-4">
//         <h2>Latest News</h2>
//         {news.map(item => (
//           <div key={item._id} className="card mb-3">
//             <img src={item.images[0]} alt={item.title} className="card-img-top" />
//             <div className="card-body">
//               <h5 className="card-title">{item.title}</h5>
//               <Link to={`/news/${item._id}`} className="btn btn-primary">Read More</Link>
//             </div>
//           </div>
//         ))}
//         {loading && <p>Loading...</p>}
//         <button className="btn btn-secondary mt-3" onClick={loadMore}>Load More</button>
//       </div>
//     );
//   };
  
//   export default NewsList;
  

  
import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/news?page=${page}&limit=3`);
      console.log("Data fetched", data);
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

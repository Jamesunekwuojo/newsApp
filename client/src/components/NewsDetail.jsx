import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    api.get(`/api/news/${id}`).then((res) => setNews(res.data));
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-4xl">{news.title}</h2>
      <img
        src={news.images[0]}
        alt={news.title}
        className="mx-4 w-full h-80 object-cover rounded-md"
      />
      <div className="mx-4">
        <p>{news.text}</p>
        <p>
          <strong>Tags:</strong> {news.tags.join(", ")}
        </p>
        <p>
          <strong>Likes:</strong> {news.likes}
        </p>
        <p>
          <strong>views:</strong> {news.views}
        </p>
      </div>
    </div>
  );
};

export default NewsDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../services/api';

// const NewsDetail = () => {
//   const { id } = useParams();
//   const [news, setNews] = useState(null);

//   useEffect(() => {
//     api.get(`/api/news/${id}`).then(res => setNews(res.data));
//   }, [id]);

//   if (!news) return <p className="text-orange-400 text-center mt-6">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
//       <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
//         <h2 className="text-3xl font-bold text-orange-500 mb-4">{news.title}</h2>
//         <img src={news.images[0]} alt={news.title} className="w-full h-80 object-cover rounded-md" />
//         <p className="text-gray-300 mt-4">{news.text}</p>
//         <p className="text-orange-400 mt-2"><strong>Tags:</strong> {news.tags.join(', ')}</p>
//         <p className="text-orange-400"><strong>Likes:</strong> {news.likes}</p>
//         <p className="text-orange-400"><strong>Views:</strong> {news.views}</p>
//       </div>
//     </div>
//   );
// };

// export default NewsDetail;

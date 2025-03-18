import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    api.get(`/api/news/${id}`).then(res => setNews(res.data));
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{news.title}</h2>
      <img src={news.images[0]} alt={news.title} className="img-fluid" />
      <p>{news.text}</p>
      <p><strong>Tags:</strong> {news.tags.join(', ')}</p>
      <p><strong>Likes:</strong> {news.likes}</p>
      <p><strong>views:</strong> {news.views}</p>
    </div>
  );
};

export default NewsDetail;
import { useState, useEffect } from "react";
import api from "../services/api";




const NewsList = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
  
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/news?page=${page}&limit=3`);
        setNews(prev => [...prev, ...data]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news', err);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchNews();
    }, [page]);
  
    const loadMore = () => setPage(prev => prev + 1);
  
    return (
      <div className="container mt-4">
        <h2>Latest News</h2>
        {news.map(item => (
          <div key={item._id} className="card mb-3">
            <img src={item.images[0]} alt={item.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <Link to={`/news/${item._id}`} className="btn btn-primary">Read More</Link>
            </div>
          </div>
        ))}
        {loading && <p>Loading...</p>}
        <button className="btn btn-secondary mt-3" onClick={loadMore}>Load More</button>
      </div>
    );
  };
  
  export default NewsList;
  

  
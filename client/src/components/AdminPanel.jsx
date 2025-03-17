import { useState } from "react";
import api from "../services/api";

const AdminPanel = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('tags', tags.split(','));
      formData.append('image', image);
      await api.post('/api/news', formData);
    };
  
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-6">
        <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl text-center font-semibold  mb-4"> Add News</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Title" 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="w-full p-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            />
            <textarea 
              placeholder="Text" 
              onChange={e => setText(e.target.value)} 
              required 
              className="w-full p-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            ></textarea>
            <input 
              type="text" 
              placeholder="Tags (comma separated)" 
              onChange={e => setTags(e.target.value)} 
              required 
              className="w-full p-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            />
            <label>add an Image:</label>
            <input 
              type="file" 
              onChange={e => setImage(e.target.files[0])} 
              required 
              className="w-full p-2 border  rounded-lg bg-white file:cursor-pointer"
            />
            <button 
              type="submit" 
              className="w-full cursor-pointer bg-gray-700 text-white py-2 rounded-lg hover:bg-black transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AdminPanel;

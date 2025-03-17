import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import api from "../services/api";

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({name: "", email: "", password: ""})

  const handleChange = async (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const result = api.post('/api/admin/signup', formData)

      if(result.success){
        console.log("User created successfully");
        navigate("/dashboard");
        
      }

    } catch (error) {
      
      console.log(error.message);
    }

  
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {/* <Link to="/" className="absolute left-8 top-8 flex items-center gap-2">
        <Building2 className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-bold">NewsHub</span>
      </Link> */}

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-gray-600">Enter your information to create an account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="Name" className="block text-sm font-medium">
                Admin name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="John"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
           
          </div> */}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              value={formData.email}
              placeholder="name@example.com"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">

              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              type="password"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-white text-sm font-medium cursor-pointer hover:bg-black"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
const API_URL=import.meta.env.VITE_API_URL;
const Auth = ({ setUser }) => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isArtist, setIsArtist] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const endpoint = isSignIn ? 'http://localhost:8090/api/v1/users/signin' : 'http://localhost:8090/api/v1/users/signup';
      console.log(endpoint);
      const response = await axios.post(endpoint, {
        ...formData,
        role: isArtist ? 'artist' : 'user'
      });
      
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <motion.div 
            className={`w-full md:w-1/2 p-8 ${isSignIn ? 'order-2 md:order-1' : 'order-1'}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {isSignIn ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              {!isSignIn && (
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    !isArtist ? 'bg-purple-600 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setIsArtist(false)}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isArtist ? 'bg-purple-600 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setIsArtist(true)}
                >
                  Artist
                </button>
              </div>
            )}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                className="text-purple-600 font-semibold hover:text-purple-700"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </motion.div>
          <motion.div 
            className={`w-full md:w-1/2 bg-purple-600 p-8 text-white flex items-center justify-center ${
              isSignIn ? 'order-1 md:order-2' : 'order-2'
            }`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4">
                {isSignIn ? 'New Here?' : 'One of Us?'}
              </h3>
              <p className="mb-6">
                {isSignIn
                  ? 'Sign up and discover great art pieces!'
                  : 'Sign in to access your account!'}
              </p>
              <button
                className="border-2 border-white px-6 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
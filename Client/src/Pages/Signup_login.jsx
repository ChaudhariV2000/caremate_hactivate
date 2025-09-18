import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen = true, onClose }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    number: '',
    address: '',
    dob: '',
    imageUrl: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const validateInputs = () => {
    const { name, password, number, address, dob, imageUrl } = formData;
    if (!name || !password) {
      return 'Name and Password are required.';
    }
    if (isSignup) {
      if (!address) return 'Address is required.';
      if (!number) return 'Phone number is required.';
      if (!dob) return 'Date of Birth is required.';
      if (!imageUrl) return 'Profile image URL is required.';

      // Validate URL format
      try {
        new URL(imageUrl);
      } catch (e) {
        return 'Please enter a valid image URL.';
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData);
      console.log('Signup successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user.name);

      navigate("/");
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.password) {
      setErrorMessage('Name and Password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        username: formData.name,
        password: formData.password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user.name);
      // After successful login
      navigate("/");
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    isSignup ? handleSubmit(e) : handleLoginSubmit(e);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{isSignup ? 'Sign Up' : 'Login'}</h2>
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              required
            />
          </div>

          {isSignup && (
            <>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
          </button>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
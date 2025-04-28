import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUpload, FaImage, FaExclamationCircle, FaCheckCircle ,FaPalette} from 'react-icons/fa';
const API_URL=import.meta.env.VITE_BASE_URL;
const ShowcaseArtwork = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      console.log(formData);
      console.log("Image Type:", formData.image instanceof File); // Should be true

      data.append('name', formData.title);
      data.append('description', formData.description);
      data.append('prices', formData.price);
      data.append('image', formData.image);
      
      const user = JSON.parse(localStorage.getItem('user'));
      data.append('artistId', user.id);
      for (let pair of data.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }
            // Replace with your actual API endpoint
      await axios.post('http://localhost:8090/api/v1/painting/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Failed to upload artwork. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FaPalette className="mr-2" />
              Showcase Your Artwork
            </h1>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-6 bg-red-50 border-l-4 border-red-400 p-4 rounded"
            >
              <div className="flex items-center">
                <FaExclamationCircle className="text-red-400 mr-3" />
                <p className="text-red-700">{error}</p>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-6 bg-green-50 border-l-4 border-green-400 p-4 rounded"
            >
              <div className="flex items-center">
                <FaCheckCircle className="text-green-400 mr-3" />
                <p className="text-green-700">Artwork uploaded successfully! Redirecting...</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artwork Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter the title of your artwork"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                placeholder="Describe your artwork..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price 
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                onWheel={(e) => e.target.blur()}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter the price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artwork Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-64 w-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setFormData({ ...formData, image: null });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                          <span>Upload artwork image</span>
                          <input
                            type="file"
                            required
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FaUpload />
                    <span>Upload Artwork</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ShowcaseArtwork;
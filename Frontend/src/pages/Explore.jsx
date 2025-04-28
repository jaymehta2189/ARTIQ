
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaExclamationCircle, FaPalette, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';

const Explore = () => {
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [cartStatus, setCartStatus] = useState({ id: null, loading: false, success: false });
  const [purchaseStatus, setPurchaseStatus] = useState({ id: null, loading: false });

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8090/api/v1/painting/');
        setPaintings(response.data.filter(painting => !painting.isBuy));
      } catch (error) {
        setError('Failed to load paintings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  const handleAddToCart = async (paintingId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/auth');
      return;
    }

    setCartStatus({ id: paintingId, loading: true, success: false });
    try {
      await axios.post(`http://localhost:8090/api/v1/users/${user.id}/cart/${paintingId}`);
      setCartStatus({ id: paintingId, loading: false, success: true });
      setTimeout(() => {
        setCartStatus({ id: null, loading: false, success: false });
      }, 2000);
    } catch (error) {
      setError('Failed to add item to cart. Please try again.');
      setCartStatus({ id: null, loading: false, success: false });
    }
  };

  const handleBuyNow = async (paintingId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/auth');
      return;
    }

    if (window.confirm('Are you sure you want to purchase this painting?')) {
      setPurchaseStatus({ id: paintingId, loading: true });
      try {
        await axios.post(`http://localhost:8090/api/v1/painting/${user.id}/buyitem/${paintingId}`);
        setPurchaseStatus({ id: null, loading: false });
        setPaintings(paintings.filter(p => p.id !== paintingId));
        navigate('/', { 
          state: { 
            message: 'Purchase successful! Thank you for your order.',
            type: 'success'
          }
        });
      } catch (error) {
        setError('Failed to complete purchase. Please try again.');
        setPurchaseStatus({ id: null, loading: false });
      }
    }
  };

  const filteredPaintings = paintings.filter(painting => {
    const matchesSearch = painting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         painting.artistName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const price = parseFloat(painting.prices);
    if (priceFilter === 'all') return matchesSearch;
    if (priceFilter === 'under1000') return matchesSearch && price < 1000;
    if (priceFilter === 'under5000') return matchesSearch && price < 5000;
    return matchesSearch && price >= 5000;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-1 mb-4 md:mb-0">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search paintings or artists..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under1000">Under $1,000</option>
              <option value="under5000">Under $5,000</option>
              <option value="over5000">$5,000 & Above</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-lg"
          >
            <div className="flex items-center">
              <FaExclamationCircle className="text-red-400 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          </div>
        ) : (
          /* Paintings Grid */
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPaintings.map((painting) => (
                <motion.div
                  key={painting.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative pb-[66.67%]">
                    <img
                      src={painting.url}
                      alt={painting.name}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {painting.name}
                    </h3>
                    <div className="flex items-center mb-4 text-gray-600">
                      <FaPalette className="mr-2" />
                      <p>By {painting.artistName}</p>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {painting.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-semibold text-lg">
                        ${parseFloat(painting.prices).toLocaleString()}
                      </span>
                      <div className="flex space-x-2">
                        {cartStatus.id === painting.id ? (
                          cartStatus.success ? (
                            <div className="flex items-center text-green-600">
                              <FaCheckCircle className="mr-2" />
                              <span>Added!</span>
                            </div>
                          ) : (
                            <button
                              disabled
                              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg opacity-75"
                            >
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                              <span>Adding...</span>
                            </button>
                          )
                        ) : (
                          <>
                            <button
                              onClick={() => handleAddToCart(painting.id)}
                              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              <FaShoppingCart />
                              <span>Add to Cart</span>
                            </button>
                            <button
                              onClick={() => handleBuyNow(painting.id)}
                              disabled={purchaseStatus.id === painting.id}
                              className={`flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ${
                                purchaseStatus.id === painting.id ? 'opacity-75 cursor-not-allowed' : ''
                              }`}
                            >
                              {purchaseStatus.id === painting.id ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                  <span>Processing...</span>
                                </>
                              ) : (
                                <span>Buy Now</span>
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* No Results Message */}
        {!loading && filteredPaintings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaExclamationCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No paintings found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Explore;
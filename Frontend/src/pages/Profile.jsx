
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUser, FaPalette, FaEdit, FaExclamationCircle, FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';

const Profile = ({ user, setUser }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: ''
  });
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);

        // Fetch user details
        const userResponse = await axios.get(`http://localhost:8090/api/v1/users/${user.id}`);
        setUserDetails(userResponse.data);
        setFormData({ username: userResponse.data.username });

        // Fetch purchased items
        const purchasedResponse = await axios.get(`http://localhost:8090/api/v1/users/${user.id}/buyitem`);
        console.log(purchasedResponse.data);
        setPurchasedItems(purchasedResponse.data);

        // Fetch sold items if user is an artist
        if (user.role === 'artist') {
          const soldResponse = await axios.get(`http://localhost:8090/api/v1/users/${user.id}/solditem`);
          console.log(soldResponse.data);
          setSoldItems(soldResponse.data);
        }
      } catch (error) {
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.put(`http://localhost:8090/api/v1/users/${user.id}`, null, {
        params: { username: formData.username }
    });
    
      setUserDetails({ ...userDetails, username: formData.username });
      setEditing(false);
      const updatedUser = { ...user, username: formData.username };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                {userDetails?.role === 'artist' ? (
                  <FaPalette className="h-8 w-8 text-purple-600" />
                ) : (
                  <FaUser className="h-8 w-8 text-purple-600" />
                )}
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{userDetails?.username}</h1>
                <p className="capitalize">{userDetails?.role}</p>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="ml-auto bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Profile Form */}
            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ username: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({ username: userDetails.username });
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* Profile Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Email:</span> {userDetails?.email}
                    </p>
                  </div>
                </div>

                {/* Purchased Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaShoppingBag className="mr-2 text-purple-600" />
                    Purchased Artworks
                  </h3>
                  <div className="space-y-4">
                    {purchasedItems.length > 0 ? (
                      purchasedItems.map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-gray-600">By {item.artistName}</p>
                          </div>
                          <span className="text-purple-600 font-semibold">
                            ${parseFloat(item.prices).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 text-center py-4">No purchases yet.</p>
                    )}
                  </div>
                </div>

                {/* Sold Items (for artists) */}
                {user?.role === 'artist' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaMoneyBillWave className="mr-2 text-green-600" />
                      Your Artworks
                    </h3>
                    <div className="space-y-4">
                      {soldItems.length > 0 ? (
                        soldItems.map((item) => (
                          <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            </div>
                            <span className="text-green-600 font-semibold">
                              ${parseFloat(item.prices).toLocaleString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 text-center py-4">No sales yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
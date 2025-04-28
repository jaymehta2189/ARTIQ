
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUser, FaPalette, FaSignOutAlt, FaPlus, FaShoppingCart } from 'react-icons/fa';
// import Cart from './Cart';

// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [cartItemCount, setCartItemCount] = useState(0);

//   useEffect(() => {
//     const fetchCartCount = async () => {
//       if (!user) return;
//       try {
//         const response = await axios.get(`http://localhost:8090/api/v1/users/${userId}/cart`);
//         setCartItemCount(response.data.length);
//       } catch (error) {
//         console.error('Failed to fetch cart count');
//       }
//     };

//     fetchCartCount();
//   }, [user]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/');
//     setShowDropdown(false);
//   };

//   const handleCartUpdate = (count) => {
//     setCartItemCount(count);
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link to="/" className="flex items-center space-x-2">
//                 <FaPalette className="h-8 w-8 text-purple-600" />
//                 <span className="text-2xl font-bold text-gray-800">ARTIQ</span>
//               </Link>
//             </div>

//             <div className="flex items-center space-x-8">
//               <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
//               <Link to="/about" className="text-gray-600 hover:text-purple-600">About</Link>
//               <Link to="/explore" className="text-gray-600 hover:text-purple-600">Explore Paintings</Link>
//               {user && user.role === 'artist' && (
//                 <Link 
//                   to="/showcase-artwork" 
//                   className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
//                 >
//                   <FaPlus className="h-4 w-4" />
//                   <span>Showcase Artwork</span>
//                 </Link>
//               )}
              
//               {user ? (
//                 <>
//                   <button
//                     onClick={() => setShowCart(true)}
//                     className="relative text-gray-600 hover:text-purple-600"
//                   >
//                     <FaShoppingCart className="h-6 w-6" />
//                     {cartItemCount > 0 && (
//                       <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                         {cartItemCount}
//                       </span>
//                     )}
//                   </button>
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowDropdown(!showDropdown)}
//                       className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
//                     >
//                       <FaUser />
//                       <span>{user.username}</span>
//                     </button>
                    
//                     {showDropdown && (
//                       <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//                         <Link
//                           to="/profile"
//                           className="block px-4 py-2 text-gray-700 hover:bg-purple-50"
//                           onClick={() => setShowDropdown(false)}
//                         >
//                           Profile
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50"
//                         >
//                           <div className="flex items-center space-x-2">
//                             <FaSignOutAlt />
//                             <span>Logout</span>
//                           </div>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <Link
//                   to="/auth"
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
//                 >
//                   Sign In
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <Cart
//         isOpen={showCart}
//         onClose={() => setShowCart(false)}
//         userId={user?.id}
//         onCartUpdate={handleCartUpdate}
//       />
//     </>
//   );
// };

// export default Navbar;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaPalette, FaSignOutAlt, FaPlus, FaShoppingCart } from 'react-icons/fa';
import Cart from './Cart';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`http://localhost:8090/api/v1/users/${user.id}/cart`);
        setCartItemCount(response.data.length);
      } catch (error) {
        console.error('Failed to fetch cart count');
      }
    };

    fetchCartCount();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    setShowDropdown(false);
  };

  const handleCartUpdate = (count) => {
    setCartItemCount(count);
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <FaPalette className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-800">ARTIQ</span>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600">About</Link>
              <Link to="/explore" className="text-gray-600 hover:text-purple-600">Explore Paintings</Link>
              {user && user.role === 'artist' && (
                <Link 
                  to="/showcase-artwork" 
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                >
                  <FaPlus className="h-4 w-4" />
                  <span>Showcase Artwork</span>
                </Link>
              )}
              
              {user ? (
                <>
                  <button
                    onClick={() => setShowCart(true)}
                    className="relative text-gray-600 hover:text-purple-600"
                  >
                    <FaShoppingCart className="h-6 w-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
                    >
                      <FaUser />
                      <span>{user.username}</span>
                    </button>
                    
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-purple-50"
                          onClick={() => setShowDropdown(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50"
                        >
                          <div className="flex items-center space-x-2">
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Cart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        userId={user?.id}
        onCartUpdate={handleCartUpdate}
      />
    </>
  );
};

export default Navbar;
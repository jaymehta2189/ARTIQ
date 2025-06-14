

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaShoppingCart, FaTimes, FaTrash, FaExclamationCircle } from 'react-icons/fa';

// const Cart = ({ isOpen, onClose, userId, onCartUpdate }) => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [checkoutLoading, setCheckoutLoading] = useState(false);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       if (!isOpen || !userId) return;
      
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`http://localhost:8090/api/v1/users/${userId}/cart`);
//         setCartItems(response.data);
//         onCartUpdate(response.data.length);
//       } catch (error) {
//         setError('Failed to load cart items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, [isOpen, userId, onCartUpdate]);

//   const removeFromCart = async (paintingId) => {
//     try {
//       await axios.delete(`http://localhost:8090/api/v1/users/${userId}/remove/cart/${paintingId}`);
//       const updatedItems = cartItems.filter(item => item.id !== paintingId);
//       setCartItems(updatedItems);
//       onCartUpdate(updatedItems.length);
//     } catch (error) {
//       setError('Failed to remove item from cart');
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       setCheckoutLoading(true);
//       setError(null);
//       await axios.post(`http://localhost:8090/api/v1/users/${userId}/buy/cart`);
//       onClose();
//       navigate('/', { 
//         state: { 
//           message: 'Purchase successful! Thank you for your order.',
//           type: 'success'
//         }
//       });
//     } catch (error) {
//       setError('Failed to complete checkout. Please try again.');
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + parseFloat(item.prices), 0);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black z-40"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
//           >
//             <div className="flex flex-col h-full">
//               {/* Header */}
//               <div className="p-4 bg-purple-600 text-white flex justify-between items-center">
//                 <div className="flex items-center">
//                   <FaShoppingCart className="text-2xl mr-2" />
//                   <h2 className="text-xl font-semibold">Your Cart</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-2 hover:bg-purple-700 rounded-full transition-colors"
//                 >
//                   <FaTimes className="text-xl" />
//                 </button>
//               </div>

//               {/* Content */}
//               <div className="flex-1 overflow-y-auto p-4">
//                 {error && (
//                   <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
//                     <div className="flex items-center">
//                       <FaExclamationCircle className="text-red-400 mr-2" />
//                       <p className="text-red-700">{error}</p>
//                     </div>
//                   </div>
//                 )}

//                 {loading ? (
//                   <div className="flex justify-center items-center h-32">
//                     <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent" />
//                   </div>
//                 ) : cartItems.length === 0 ? (
//                   <div className="text-center py-8">
//                     <FaShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
//                     <p className="text-gray-600">Your cart is empty</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {cartItems.map((item) => (
//                       <motion.div
//                         key={item.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         className="bg-white rounded-lg shadow p-4 flex items-center"
//                       >
//                         <img
//                           src={item.url}
//                           alt={item.name}
//                           className="w-20 h-20 object-cover rounded"
//                         />
//                         <div className="ml-4 flex-1">
//                           <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                           <p className="text-gray-600">By {item.artistName}</p>
//                           <p className="text-purple-600 font-semibold">
//                             ${parseFloat(item.prices).toLocaleString()}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//                         >
//                           <FaTrash />
//                         </button>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Footer */}
//               {cartItems.length > 0 && (
//                 <div className="border-t p-4 bg-gray-50">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-lg font-semibold">Total:</span>
//                     <span className="text-xl font-bold text-purple-600">
//                       ${calculateTotal().toLocaleString()}
//                     </span>
//                   </div>
//                   <button 
//                     className={`w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center ${
//                       checkoutLoading ? 'opacity-75 cursor-not-allowed' : ''
//                     }`}
//                     onClick={handleCheckout}
//                     disabled={checkoutLoading}
//                   >
//                     {checkoutLoading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
//                         Processing...
//                       </>
//                     ) : (
//                       'Checkout'
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaTrash, FaExclamationCircle } from 'react-icons/fa';
import StripeCheckoutForm from './StripeCheckoutForm';

// your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = ({ isOpen, onClose, userId, onCartUpdate }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showStripe, setShowStripe] = useState(false);

  // fetch cart as before
  useEffect(() => {
    if (!isOpen || !userId) return;
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:8090/api/v1/users/${userId}/cart`)
      .then(res => {
        setCartItems(res.data);
        onCartUpdate(res.data.length);
      })
      .catch(() => setError('Failed to load cart items'))
      .finally(() => setLoading(false));
  }, [isOpen, userId, onCartUpdate]);

  const removeFromCart = paintingId => {
    axios.delete(`http://localhost:8090/api/v1/users/${userId}/remove/cart/${paintingId}`)
      .then(() => {
        const updated = cartItems.filter(i => i.id !== paintingId);
        setCartItems(updated);
        onCartUpdate(updated.length);
      })
      .catch(() => setError('Failed to remove item'));
  };

  const calculateItemsPayload = () =>
    cartItems.map(item => ({
      productId: item.id,
      price: parseFloat(item.prices),
      quantity: 1
    }));

  const calculateTotalCents = () =>
    Math.round(cartItems.reduce((sum, i) => sum + parseFloat(i.prices), 0) * 100);

  const handleSuccess = async() => {
    setShowStripe(false);
    console.log('Payment successful, updating cart...');
    await axios.post(`http://localhost:8090/api/v1/users/${userId}/buy/cart`);
    console.log('Cart updated, closing cart modal...');
    onClose();
    navigate('/', {
      state: {
        message: 'Purchase successful! Thank you for your order.',
        type: 'success'
      }
    });
  };

  const handleError = msg => {
    setError(msg);
    setShowStripe(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40" onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-purple-600 text-white flex justify-between items-center">
              <div className="flex items-center">
                <FaShoppingCart className="text-2xl mr-2" />
                <h2 className="text-xl font-semibold">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-purple-700 rounded-full">
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
                  <div className="flex items-center">
                    <FaExclamationCircle className="text-red-400 mr-2" />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent" />
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <FaShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-lg shadow p-4 flex items-center"
                    >
                      <img src={item.url} alt={item.name}
                           className="w-20 h-20 object-cover rounded" />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">By {item.artistName}</p>
                        <p className="text-purple-600 font-semibold">
                          ${parseFloat(item.prices).toLocaleString()}
                        </p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Stripe */}
            {cartItems.length > 0 && (
              showStripe ? (
                <div className="p-4 bg-gray-50">
                  <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                      amount={calculateTotalCents()}
                      userId={userId}
                      items={calculateItemsPayload()}
                      onSuccess={handleSuccess}
                      onError={handleError}
                    />
                  </Elements>
                </div>
              ) : (
                <div className="border-t p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-purple-600">
                      ${ (calculateTotalCents()/100).toLocaleString() }
                    </span>
                  </div>
                  <button
                    className={`w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center ${
                      checkoutLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    onClick={() => setShowStripe(true)}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Checkout'
                    )}
                  </button>
                </div>
              )
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;

// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const StripeCheckoutForm = ({ amount, userId, items, onSuccess, onError }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:8090/api/stripe/create-payment-intent', { amount });

//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.paymentIntent.status === 'succeeded') {
//         await axios.post('http://localhost:8090/api/stripe/verify-payment', {
//           paymentIntentId: result.paymentIntent.id,
//           userId,
//           items
//         });
//         onSuccess();
//       } else {
//         onError('Payment not successful');
//       }
//     } catch (error) {
//       console.error(error);
//       onError('Payment failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>Pay</button>
//     </form>
//   );
// };

// export default StripeCheckoutForm;



import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';

const StripeCheckoutForm = ({ amount, userId, items, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onError('Stripe has not loaded yet. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Card element not found. Please refresh and try again.');
      return;
    }

    setLoading(true);
    setProcessing(true);

    try {
      // Create payment intent
      const { data } = await axios.post('http://localhost:8090/api/stripe/create-payment-intent', { amount });

      // Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        onError(result.error.message || 'Payment failed. Please try again.');
        setLoading(false);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        // Verify payment on backend
        await axios.post('http://localhost:8090/api/stripe/verify-payment', {
          paymentIntentId: result.paymentIntent.id,
          userId,
          items,
        });

        setProcessing(false);
        onSuccess();
      } else {
        onError('Payment was not successful. Please try again.');
        setLoading(false);
        setProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError('Payment failed. Please try again.');
      setLoading(false);
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        '::placeholder': {
          color: '#9ca3af',
        },
        iconColor: '#6b7280',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h2>
        <p className="text-gray-600">Secure checkout powered by Stripe</p>
      </div>

      {/* Amount Display */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Amount</span>
          <span className="text-2xl font-bold text-gray-900">
            ${(amount / 100).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Element */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
            <CreditCard className="w-4 h-4 mr-2" />
            Card Information
          </label>
          <div className="relative">
            <div className="border-2 border-gray-200 rounded-xl p-4 bg-white focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-200">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
          <Lock className="w-4 h-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
            loading
              ? 'bg-gray-400 cursor-not-allowed scale-95'
              : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              {processing ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Preparing Payment...</span>
                </>
              )}
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Pay ${(amount / 100).toFixed(2)}</span>
            </>
          )}
        </button>
      </form>

      {/* Test Card Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 font-medium mb-1">Test Mode</p>
        <p className="text-xs text-blue-600">
          Use card: <span className="font-mono font-semibold">4242 4242 4242 4242</span>
        </p>
        <p className="text-xs text-blue-600">Any future date and CVC</p>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Powered by <span className="font-semibold">Stripe</span> •
          <span className="ml-1">256-bit SSL encryption</span>
        </p>
      </div>
    </div>
  );
};

export default StripeCheckoutForm;

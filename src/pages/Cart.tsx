import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link
            to="/products"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {items.map((item) => (
                <div key={item.productId} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <Link to={`/product/${item.productId}`}>
                      <img
                        src={item.product.images[0] || 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg'}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <Link 
                        to={`/product/${item.productId}`}
                        className="font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        by {item.product.sellerName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Condition: {item.product.condition}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-lg hover:bg-gray-300"
                      >
                        <Minus className="h-4 w-4 mx-auto" />
                      </button>
                      <span className="font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4 mx-auto" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(getCartTotal() * 0.08)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(getCartTotal() * 1.08)}</span>
                  </div>
                </div>
              </div>

              {user ? (
                <Link
                  to="/checkout"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login?redirect=/checkout"
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors text-center block"
                  >
                    Login to Checkout
                  </Link>
                  <p className="text-sm text-gray-600 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-red-600 hover:text-red-700">
                      Sign up
                    </Link>
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">✓ Free shipping on orders over $100</p>
                  <p className="mb-2">✓ 30-day return policy</p>
                  <p>✓ Secure payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
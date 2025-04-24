import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "./../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import cash_icon from '../assets/cash_icon.png'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchAllOrders = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <img src={assets.empty_order} alt="No orders" className="w-48 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-700">No orders found</h3>
          <p className="text-gray-500 mt-2">You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.payment ? 'Paid' : 'Payment Pending'}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  {order.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start py-4 border-b border-gray-100 last:border-0 transition-colors duration-200 hover:bg-gray-50"
                    >
                      <img 
                        src={item.image?.[0] || assets.placeholder} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          {item.size} • {item.quantity} × {currency}{item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{currency}{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Shipping Address */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Shipping Address</h4>
                    {order.address && (
                      <div className="text-sm text-gray-600">
                        <p>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}</p>
                        <p>
                          {order.address.city}, {order.address.state} {order.address.zipcode}
                        </p>
                        <p>{order.address.country}</p>
                        <p className="mt-2">Phone: {order.address.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Payment Method</h4>
                    <div className="flex items-center">
                      {order.paymentMethod === 'COD' ? (
                        <>
                          <img src={cash_icon} alt="COD" className="w-8 h-8 mr-2" />
                          <span className="text-sm">Cash on Delivery</span>
                        </>
                      ) : order.paymentMethod === 'STRIPE' ? (
                        <>
                          <img src={assets.stripe_logo} alt="Stripe" className="h-5 mr-2" />
                          <span className="text-sm">Credit/Debit Card</span>
                        </>
                      ) : (
                        <>
                          <img src={assets.razorpay_logo} alt="Razorpay" className="h-5 mr-2" />
                          <span className="text-sm">Razorpay</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Order Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal ({order.items.length} items)</span>
                        <span>{currency}{calculateTotal(order.items)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                        <span>Total</span>
                        <span>{currency}{calculateTotal(order.items)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Packing' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'Shipping' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Out of Delivery' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  {/* Admin status update dropdown */}
                  {token && (
                    <div className="w-full sm:w-auto">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Out of Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
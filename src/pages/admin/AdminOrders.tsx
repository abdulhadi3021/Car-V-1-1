import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Order } from '../../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Mock data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        _id: '1',
        buyerId: '1',
        buyerName: 'Ahmed Khan',
        items: [
          {
            productId: '1',
            product: {
              _id: '1',
              title: 'High Performance Engine Oil',
              description: 'Premium synthetic motor oil',
              price: 4599,
              category: 'Engine',
              images: ['https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg'],
              sellerId: '2',
              stock: 50,
              condition: 'new',
              createdAt: '2024-01-15T10:30:00Z',
              updatedAt: '2024-01-15T10:30:00Z',
            },
            quantity: 2,
            price: 4599,
          },
        ],
        total: 9198,
        status: 'delivered',
        shippingDetails: {
          address: '123 Main Street',
          city: 'Karachi',
          postalCode: '75500',
          phone: '+92 300 1234567',
        },
        paymentMethod: 'easypaisa',
        paymentStatus: 'completed',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        trackingNumber: 'TRK123456789',
      },
      {
        _id: '2',
        buyerId: '2',
        buyerName: 'Sarah Ahmed',
        items: [
          {
            productId: '2',
            product: {
              _id: '2',
              title: 'LED Headlight Kit',
              description: 'Ultra-bright LED headlight conversion kit',
              price: 8999,
              category: 'Electronics',
              images: ['https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg'],
              sellerId: '3',
              stock: 25,
              condition: 'new',
              createdAt: '2024-01-14T15:20:00Z',
              updatedAt: '2024-01-14T15:20:00Z',
            },
            quantity: 1,
            price: 8999,
          },
        ],
        total: 8999,
        status: 'shipped',
        shippingDetails: {
          address: '456 Oak Avenue',
          city: 'Lahore',
          postalCode: '54000',
          phone: '+92 301 9876543',
        },
        paymentMethod: 'jazzcash',
        paymentStatus: 'completed',
        createdAt: '2024-01-14T15:20:00Z',
        updatedAt: '2024-01-14T15:20:00Z',
        trackingNumber: 'TRK987654321',
      },
      {
        _id: '3',
        buyerId: '3',
        buyerName: 'Hassan Ali',
        items: [
          {
            productId: '3',
            product: {
              _id: '3',
              title: 'Sport Alloy Wheels',
              description: '18-inch lightweight alloy wheels',
              price: 129999,
              category: 'Wheels',
              images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
              sellerId: '4',
              stock: 8,
              condition: 'new',
              createdAt: '2024-01-13T09:15:00Z',
              updatedAt: '2024-01-13T09:15:00Z',
            },
            quantity: 1,
            price: 129999,
          },
        ],
        total: 129999,
        status: 'pending',
        shippingDetails: {
          address: '789 Pine Road',
          city: 'Islamabad',
          postalCode: '44000',
          phone: '+92 302 5555555',
        },
        paymentMethod: 'stripe',
        paymentStatus: 'pending',
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z',
      },
    ];
    
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      easypaisa: 'Easypaisa',
      jazzcash: 'JazzCash',
      stripe: 'Credit/Debit Card',
      payeer: 'Payeer',
      wwallet: 'W-Wallet',
    };
    return methods[method] || method;
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order._id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = filteredOrders.filter(o => o.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Order Management</h1>
            <p className="text-gray-400 mt-2">Track and manage customer orders</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Orders</h3>
            <p className="text-2xl font-bold text-white">{filteredOrders.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Completed</h3>
            <p className="text-2xl font-bold text-green-500">{completedOrders}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Pending</h3>
            <p className="text-2xl font-bold text-yellow-500">
              {filteredOrders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
            <p className="text-2xl font-bold text-white">{formatPrice(totalRevenue)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Filter className="h-4 w-4" />
              <span className="text-sm">{filteredOrders.length} orders</span>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">#{order._id}</div>
                        {order.trackingNumber && (
                          <div className="text-sm text-gray-400">{order.trackingNumber}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{order.buyerName}</div>
                        <div className="text-sm text-gray-400">{order.shippingDetails.city}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-gray-400">
                        {order.items[0].product.title}
                        {order.items.length > 1 && ` +${order.items.length - 1} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{formatPrice(order.total)}</div>
                      <div className="text-sm text-gray-400">{getPaymentMethodName(order.paymentMethod)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-red-600 hover:text-red-500 flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Modal */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Order Details</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Order Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Order ID</label>
                      <p className="font-medium">#{selectedOrder._id}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Status</label>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(selectedOrder.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Total Amount</label>
                      <p className="font-medium text-lg">{formatPrice(selectedOrder.total)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Payment Method</label>
                      <p className="font-medium">{getPaymentMethodName(selectedOrder.paymentMethod)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Payment Status</label>
                      <p className="font-medium capitalize">{selectedOrder.paymentStatus}</p>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div>
                        <label className="text-sm text-gray-400">Tracking Number</label>
                        <p className="font-medium">{selectedOrder.trackingNumber}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm text-gray-400">Order Date</label>
                      <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Customer & Shipping</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Customer</label>
                      <p className="font-medium">{selectedOrder.buyerName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Phone</label>
                      <p className="font-medium">{selectedOrder.shippingDetails.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Address</label>
                      <p className="font-medium">
                        {selectedOrder.shippingDetails.address}<br />
                        {selectedOrder.shippingDetails.city}, {selectedOrder.shippingDetails.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Order Items</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                      <img
                        src={item.product.images[0] || 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg'}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{item.product.title}</h5>
                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-400">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex flex-wrap gap-2 mb-4">
                  <h4 className="font-semibold">Update Status:</h4>
                  {['pending', 'paid', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateOrderStatus(selectedOrder._id, status as Order['status'])}
                      disabled={selectedOrder.status === status}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedOrder.status === status
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
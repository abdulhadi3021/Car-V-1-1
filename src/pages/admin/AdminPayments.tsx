import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

const AdminPayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data
  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: '1',
        orderId: 'ORD-001',
        customerName: 'Ahmed Khan',
        customerEmail: 'ahmed@example.com',
        amount: 45999,
        method: 'easypaisa',
        status: 'completed',
        transactionId: 'EP-123456789',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:35:00Z',
      },
      {
        id: '2',
        orderId: 'ORD-002',
        customerName: 'Sarah Ahmed',
        customerEmail: 'sarah@example.com',
        amount: 129999,
        method: 'jazzcash',
        status: 'pending',
        transactionId: 'JC-987654321',
        createdAt: '2024-01-14T15:20:00Z',
        updatedAt: '2024-01-14T15:20:00Z',
      },
      {
        id: '3',
        orderId: 'ORD-003',
        customerName: 'Hassan Ali',
        customerEmail: 'hassan@example.com',
        amount: 59999,
        method: 'stripe',
        status: 'completed',
        transactionId: 'ST-456789123',
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:16:00Z',
      },
      {
        id: '4',
        orderId: 'ORD-004',
        customerName: 'Fatima Sheikh',
        customerEmail: 'fatima@example.com',
        amount: 89999,
        method: 'payeer',
        status: 'failed',
        transactionId: 'PR-789123456',
        createdAt: '2024-01-12T14:45:00Z',
        updatedAt: '2024-01-12T14:50:00Z',
      },
      {
        id: '5',
        orderId: 'ORD-005',
        customerName: 'Usman Raja',
        customerEmail: 'usman@example.com',
        amount: 34999,
        method: 'wwallet',
        status: 'refunded',
        transactionId: 'WW-321654987',
        createdAt: '2024-01-11T11:30:00Z',
        updatedAt: '2024-01-11T16:20:00Z',
      },
    ];
    
    setPayments(mockPayments);
    setFilteredPayments(mockPayments);
  }, []);

  // Filter payments
  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    if (methodFilter !== 'all') {
      filtered = filtered.filter(payment => payment.method === methodFilter);
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter, methodFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount);
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
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'refunded':
        return <XCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      easypaisa: 'Easypaisa',
      jazzcash: 'JazzCash',
      stripe: 'Credit/Debit Card',
      payeer: 'Payeer',
      wwallet: 'W-Wallet',
    };
    return methods[method] || method;
  };

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const exportPayments = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Amount', 'Method', 'Status', 'Transaction ID', 'Date'].join(','),
      ...filteredPayments.map(payment => [
        payment.orderId,
        payment.customerName,
        payment.customerEmail,
        payment.amount,
        getMethodName(payment.method),
        payment.status,
        payment.transactionId,
        formatDate(payment.createdAt)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedAmount = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Payment Management</h1>
            <p className="text-gray-400 mt-2">Monitor and manage all payment transactions</p>
          </div>
          <button
            onClick={exportPayments}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Payments</h3>
            <p className="text-2xl font-bold text-white">{filteredPayments.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Amount</h3>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalAmount)}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Completed</h3>
            <p className="text-2xl font-bold text-green-500">{formatCurrency(completedAmount)}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Success Rate</h3>
            <p className="text-2xl font-bold text-white">
              {filteredPayments.length > 0 
                ? Math.round((filteredPayments.filter(p => p.status === 'completed').length / filteredPayments.length) * 100)
                : 0}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Methods</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="jazzcash">JazzCash</option>
              <option value="stripe">Credit/Debit Card</option>
              <option value="payeer">Payeer</option>
              <option value="wwallet">W-Wallet</option>
            </select>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Filter className="h-4 w-4" />
              <span className="text-sm">{filteredPayments.length} results</span>
            </div>
          </div>
        </div>

        {/* Payments Table */}
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
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Method
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
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{payment.orderId}</div>
                        <div className="text-sm text-gray-400">{payment.transactionId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{payment.customerName}</div>
                        <div className="text-sm text-gray-400">{payment.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{formatCurrency(payment.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{getMethodName(payment.method)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(payment)}
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

        {/* Payment Detail Modal */}
        {showDetailModal && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Payment Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Transaction Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Transaction ID</label>
                      <p className="font-medium">{selectedPayment.transactionId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Order ID</label>
                      <p className="font-medium">{selectedPayment.orderId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Amount</label>
                      <p className="font-medium text-lg">{formatCurrency(selectedPayment.amount)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Payment Method</label>
                      <p className="font-medium">{getMethodName(selectedPayment.method)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Status</label>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(selectedPayment.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPayment.status)}`}>
                          {selectedPayment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Customer Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Name</label>
                      <p className="font-medium">{selectedPayment.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Email</label>
                      <p className="font-medium">{selectedPayment.customerEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Created At</label>
                      <p className="font-medium">{formatDate(selectedPayment.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Updated At</label>
                      <p className="font-medium">{formatDate(selectedPayment.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex space-x-4">
                  {selectedPayment.status === 'pending' && (
                    <>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Mark as Completed
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Mark as Failed
                      </button>
                    </>
                  )}
                  {selectedPayment.status === 'completed' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Process Refund
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
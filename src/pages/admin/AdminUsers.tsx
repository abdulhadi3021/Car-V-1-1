import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, Edit, Trash2, Eye, Shield, ShieldOff } from 'lucide-react';
import { User } from '../../types';
import toast from 'react-hot-toast';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        _id: '1',
        name: 'Ahmed Khan',
        email: 'ahmed@example.com',
        role: 'buyer',
        createdAt: '2024-01-15T10:30:00Z',
        isVerified: true,
        profileInfo: {
          phone: '+92 300 1234567',
          address: 'Karachi, Pakistan',
        },
      },
      {
        _id: '2',
        name: 'Sarah Ahmed',
        email: 'sarah@example.com',
        role: 'seller',
        createdAt: '2024-01-10T15:20:00Z',
        isVerified: true,
        profileInfo: {
          phone: '+92 301 9876543',
          address: 'Lahore, Pakistan',
        },
      },
      {
        _id: '3',
        name: 'Hassan Ali',
        email: 'hassan@example.com',
        role: 'buyer',
        createdAt: '2024-01-05T09:15:00Z',
        isVerified: false,
        profileInfo: {
          phone: '+92 302 5555555',
          address: 'Islamabad, Pakistan',
        },
      },
      {
        _id: '4',
        name: 'Admin User',
        email: 'admin@mcp.com',
        role: 'admin',
        createdAt: '2023-12-01T08:00:00Z',
        isVerified: true,
        profileInfo: {
          phone: '+92 300 0000000',
          address: 'Head Office, Karachi',
        },
      },
    ];
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter users
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'seller':
        return 'bg-blue-100 text-blue-800';
      case 'buyer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsEditing(false);
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user._id !== userId));
      toast.success('User deleted successfully');
    }
  };

  const handleToggleVerification = (userId: string) => {
    setUsers(users.map(user => 
      user._id === userId 
        ? { ...user, isVerified: !user.isVerified }
        : user
    ));
    toast.success('User verification status updated');
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      setUsers(users.map(user => 
        user._id === selectedUser._id ? selectedUser : user
      ));
      toast.success('User updated successfully');
      setShowUserModal(false);
    }
  };

  const handleCreateUser = () => {
    const newUser: User = {
      _id: Date.now().toString(),
      name: '',
      email: '',
      role: 'buyer',
      createdAt: new Date().toISOString(),
      isVerified: false,
      profileInfo: {
        phone: '',
        address: '',
      },
    };
    setSelectedUser(newUser);
    setIsEditing(true);
    setShowUserModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-400 mt-2">Manage all registered users</p>
          </div>
          <button
            onClick={handleCreateUser}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
            <p className="text-2xl font-bold text-white">{users.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Buyers</h3>
            <p className="text-2xl font-bold text-green-500">
              {users.filter(u => u.role === 'buyer').length}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Sellers</h3>
            <p className="text-2xl font-bold text-blue-500">
              {users.filter(u => u.role === 'seller').length}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Verified</h3>
            <p className="text-2xl font-bold text-white">
              {users.filter(u => u.isVerified).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Filter className="h-4 w-4" />
              <span className="text-sm">{filteredUsers.length} users</span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {user.isVerified ? (
                          <Shield className="h-4 w-4 text-green-500" />
                        ) : (
                          <ShieldOff className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm ${user.isVerified ? 'text-green-500' : 'text-red-500'}`}>
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-yellow-600 hover:text-yellow-500"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleVerification(user._id)}
                          className="text-green-600 hover:text-green-500"
                        >
                          {user.isVerified ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {isEditing ? 'Edit User' : 'User Details'}
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveUser} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={selectedUser.name}
                        onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={selectedUser.email}
                        onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <select
                        value={selectedUser.role}
                        onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value as 'admin' | 'seller' | 'buyer'})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={selectedUser.profileInfo?.phone || ''}
                        onChange={(e) => setSelectedUser({
                          ...selectedUser, 
                          profileInfo: {...selectedUser.profileInfo, phone: e.target.value}
                        })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <textarea
                      value={selectedUser.profileInfo?.address || ''}
                      onChange={(e) => setSelectedUser({
                        ...selectedUser, 
                        profileInfo: {...selectedUser.profileInfo, address: e.target.value}
                      })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUser.isVerified}
                      onChange={(e) => setSelectedUser({...selectedUser, isVerified: e.target.checked})}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-white">
                      Verified User
                    </label>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUserModal(false)}
                      className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-4">Personal Information</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-400">Name</label>
                          <p className="font-medium">{selectedUser.name}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Email</label>
                          <p className="font-medium">{selectedUser.email}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Phone</label>
                          <p className="font-medium">{selectedUser.profileInfo?.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Address</label>
                          <p className="font-medium">{selectedUser.profileInfo?.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4">Account Information</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-400">Role</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(selectedUser.role)}`}>
                            {selectedUser.role}
                          </span>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Status</label>
                          <div className="flex items-center space-x-2">
                            {selectedUser.isVerified ? (
                              <Shield className="h-4 w-4 text-green-500" />
                            ) : (
                              <ShieldOff className="h-4 w-4 text-red-500" />
                            )}
                            <span className={selectedUser.isVerified ? 'text-green-500' : 'text-red-500'}>
                              {selectedUser.isVerified ? 'Verified' : 'Unverified'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Joined</label>
                          <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Edit User
                    </button>
                    <button
                      onClick={() => setShowUserModal(false)}
                      className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
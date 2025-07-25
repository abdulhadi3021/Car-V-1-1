import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Package } from 'lucide-react';
import { Product } from '../../types';
import toast from 'react-hot-toast';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        _id: '1',
        title: 'High Performance Engine Oil',
        description: 'Premium synthetic motor oil for high-performance vehicles. Provides superior protection and performance.',
        price: 4599,
        category: 'Engine',
        images: ['https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg'],
        sellerId: '2',
        sellerName: 'AutoParts Pro',
        stock: 50,
        condition: 'new',
        rating: 4.8,
        reviewCount: 124,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
      {
        _id: '2',
        title: 'LED Headlight Kit',
        description: 'Ultra-bright LED headlight conversion kit. Easy installation with professional results.',
        price: 8999,
        category: 'Electronics',
        images: ['https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg'],
        sellerId: '3',
        sellerName: 'LightTech Solutions',
        stock: 25,
        condition: 'new',
        rating: 4.6,
        reviewCount: 89,
        createdAt: '2024-01-14T15:20:00Z',
        updatedAt: '2024-01-14T15:20:00Z',
      },
      {
        _id: '3',
        title: 'Sport Alloy Wheels',
        description: '18-inch lightweight alloy wheels. Enhance your vehicle\'s performance and appearance.',
        price: 129999,
        category: 'Wheels',
        images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
        sellerId: '4',
        sellerName: 'Wheel Masters',
        stock: 8,
        condition: 'new',
        rating: 4.9,
        reviewCount: 45,
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z',
      },
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sellerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter]);

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
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-500' };
    if (stock < 10) return { text: 'Low Stock', color: 'text-yellow-500' };
    return { text: 'In Stock', color: 'text-green-500' };
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(false);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      if (selectedProduct._id === 'new') {
        // Create new product
        const newProduct = {
          ...selectedProduct,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProducts([...products, newProduct]);
        toast.success('Product created successfully');
      } else {
        // Update existing product
        setProducts(products.map(product => 
          product._id === selectedProduct._id 
            ? { ...selectedProduct, updatedAt: new Date().toISOString() }
            : product
        ));
        toast.success('Product updated successfully');
      }
      setShowProductModal(false);
    }
  };

  const handleCreateProduct = () => {
    const newProduct: Product = {
      _id: 'new',
      title: '',
      description: '',
      price: 0,
      category: 'Engine',
      images: [],
      sellerId: '1',
      sellerName: 'Admin',
      stock: 0,
      condition: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedProduct(newProduct);
    setIsEditing(true);
    setShowProductModal(true);
  };

  const categories = ['Engine', 'Body', 'Wheels', 'Electronics', 'Interior', 'Exterior'];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-gray-400 mt-2">Manage auto parts inventory</p>
          </div>
          <button
            onClick={handleCreateProduct}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Products</h3>
            <p className="text-2xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">In Stock</h3>
            <p className="text-2xl font-bold text-green-500">
              {products.filter(p => p.stock > 0).length}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Low Stock</h3>
            <p className="text-2xl font-bold text-yellow-500">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Out of Stock</h3>
            <p className="text-2xl font-bold text-red-500">
              {products.filter(p => p.stock === 0).length}
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Filter className="h-4 w-4" />
              <span className="text-sm">{filteredProducts.length} products</span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product._id} className="hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.images[0] || 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg'}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{product.title}</div>
                            <div className="text-sm text-gray-400 line-clamp-1">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{formatPrice(product.price)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Package className={`h-4 w-4 ${stockStatus.color}`} />
                          <span className={`text-sm ${stockStatus.color}`}>
                            {product.stock} ({stockStatus.text})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {product.sellerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="text-blue-600 hover:text-blue-500"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-yellow-600 hover:text-yellow-500"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Modal */}
        {showProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {isEditing ? (selectedProduct._id === 'new' ? 'Add Product' : 'Edit Product') : 'Product Details'}
                </h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={selectedProduct.title}
                        onChange={(e) => setSelectedProduct({...selectedProduct, title: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={selectedProduct.category}
                        onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={selectedProduct.description}
                      onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price (PKR)</label>
                      <input
                        type="number"
                        value={selectedProduct.price}
                        onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Stock</label>
                      <input
                        type="number"
                        value={selectedProduct.stock}
                        onChange={(e) => setSelectedProduct({...selectedProduct, stock: parseInt(e.target.value)})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Condition</label>
                      <select
                        value={selectedProduct.condition}
                        onChange={(e) => setSelectedProduct({...selectedProduct, condition: e.target.value as 'new' | 'used' | 'refurbished'})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="refurbished">Refurbished</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="url"
                      value={selectedProduct.images[0] || ''}
                      onChange={(e) => setSelectedProduct({...selectedProduct, images: [e.target.value]})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {selectedProduct._id === 'new' ? 'Create Product' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProductModal(false)}
                      className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <img
                        src={selectedProduct.images[0] || 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg'}
                        alt={selectedProduct.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg">{selectedProduct.title}</h4>
                        <p className="text-gray-400">{selectedProduct.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400">Price</label>
                          <p className="font-medium text-lg text-red-600">{formatPrice(selectedProduct.price)}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Category</label>
                          <p className="font-medium">{selectedProduct.category}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Stock</label>
                          <p className={`font-medium ${getStockStatus(selectedProduct.stock).color}`}>
                            {selectedProduct.stock} ({getStockStatus(selectedProduct.stock).text})
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Condition</label>
                          <p className="font-medium capitalize">{selectedProduct.condition}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Seller</label>
                          <p className="font-medium">{selectedProduct.sellerName}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Created</label>
                          <p className="font-medium">{formatDate(selectedProduct.createdAt)}</p>
                        </div>
                      </div>
                      
                      {selectedProduct.rating && (
                        <div>
                          <label className="text-sm text-gray-400">Rating</label>
                          <p className="font-medium">{selectedProduct.rating}/5 ({selectedProduct.reviewCount} reviews)</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={() => setShowProductModal(false)}
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

export default AdminProducts;
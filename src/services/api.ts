import axios from 'axios';
import { User, Product, Order, Review, RegisterData, Conversation, Message } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock API responses for development
const mockUser: User = {
  _id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'buyer',
  createdAt: new Date().toISOString(),
};

const mockProducts: Product[] = [
  {
    _id: '1',
    title: 'High Performance Engine Oil',
    description: 'Premium synthetic motor oil for high-performance vehicles. Provides superior protection and performance.',
    price: 45.99,
    category: 'Engine',
    images: ['https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg'],
    sellerId: '2',
    sellerName: 'AutoParts Pro',
    stock: 50,
    condition: 'new',
    rating: 4.8,
    reviewCount: 124,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'LED Headlight Kit',
    description: 'Ultra-bright LED headlight conversion kit. Easy installation with professional results.',
    price: 89.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg'],
    sellerId: '3',
    sellerName: 'LightTech Solutions',
    stock: 25,
    condition: 'new',
    rating: 4.6,
    reviewCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Sport Alloy Wheels',
    description: '18-inch lightweight alloy wheels. Enhance your vehicle\'s performance and appearance.',
    price: 1299.99,
    category: 'Wheels',
    images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
    sellerId: '4',
    sellerName: 'Wheel Masters',
    stock: 8,
    condition: 'new',
    rating: 4.9,
    reviewCount: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'Carbon Fiber Spoiler',
    description: 'Lightweight carbon fiber rear spoiler. Professional grade with perfect fitment.',
    price: 599.99,
    category: 'Body',
    images: ['https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg'],
    sellerId: '5',
    sellerName: 'Carbon Concepts',
    stock: 12,
    condition: 'new',
    rating: 4.7,
    reviewCount: 67,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const authAPI = {
  login: async (email: string, password: string) => {
    // Mock implementation
    return new Promise<{ user: User; token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@mcp.com' && password === 'admin123') {
          resolve({
            user: { ...mockUser, email: 'admin@mcp.com', role: 'admin', name: 'Admin User' },
            token: 'mock-admin-token'
          });
        } else if (email === 'seller@mcp.com' && password === 'seller123') {
          resolve({
            user: { ...mockUser, email: 'seller@mcp.com', role: 'seller', name: 'Seller User' },
            token: 'mock-seller-token'
          });
        } else if (email && password) {
          resolve({
            user: { ...mockUser, email, name: 'Buyer User' },
            token: 'mock-buyer-token'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  register: async (userData: RegisterData) => {
    // Mock implementation
    return new Promise<{ user: User; token: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          user: { ...mockUser, ...userData, _id: Date.now().toString() },
          token: 'mock-token'
        });
      }, 1000);
    });
  },

  validateToken: async (token: string) => {
    // Mock implementation
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (token.includes('admin')) {
          resolve({ ...mockUser, email: 'admin@mcp.com', role: 'admin', name: 'Admin User' });
        } else if (token.includes('seller')) {
          resolve({ ...mockUser, email: 'seller@mcp.com', role: 'seller', name: 'Seller User' });
        } else if (token) {
          resolve(mockUser);
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });
  },
};

export const productsAPI = {
  getProducts: async (filters?: { category?: string; search?: string; minPrice?: number; maxPrice?: number }) => {
    // Mock implementation
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...mockProducts];
        
        if (filters?.category && filters.category !== 'all') {
          filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
        }
        
        if (filters?.search) {
          const search = filters.search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(search) || 
            p.description.toLowerCase().includes(search)
          );
        }
        
        if (filters?.minPrice) {
          filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
        }
        
        if (filters?.maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
        }
        
        resolve(filteredProducts);
      }, 500);
    });
  },

  getProduct: async (id: string) => {
    return new Promise<Product>((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p._id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 500);
    });
  },

  createProduct: async (productData: Partial<Product>) => {
    return new Promise<Product>((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          _id: Date.now().toString(),
          title: productData.title || '',
          description: productData.description || '',
          price: productData.price || 0,
          category: productData.category || '',
          images: productData.images || [],
          sellerId: '1',
          stock: productData.stock || 0,
          condition: productData.condition || 'new',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(newProduct);
      }, 1000);
    });
  },
};

export const ordersAPI = {
  createOrder: async (orderData: any) => {
    return new Promise<Order>((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          _id: Date.now().toString(),
          buyerId: '1',
          items: orderData.items,
          total: orderData.total,
          status: 'pending',
          shippingDetails: orderData.shippingDetails,
          paymentMethod: orderData.paymentMethod,
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(newOrder);
      }, 1000);
    });
  },

  getOrders: async () => {
    return new Promise<Order[]>((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },
};

export const reviewsAPI = {
  getReviews: async (productId: string) => {
    return new Promise<Review[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            _id: '1',
            productId,
            userId: '1',
            userName: 'Mike Johnson',
            rating: 5,
            comment: 'Excellent product! Highly recommended.',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '2',
            productId,
            userId: '2',
            userName: 'Sarah Wilson',
            rating: 4,
            comment: 'Good quality, fast shipping.',
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 500);
    });
  },

  createReview: async (reviewData: Partial<Review>) => {
    return new Promise<Review>((resolve) => {
      setTimeout(() => {
        resolve({
          _id: Date.now().toString(),
          productId: reviewData.productId || '',
          userId: '1',
          userName: 'Current User',
          rating: reviewData.rating || 5,
          comment: reviewData.comment || '',
          createdAt: new Date().toISOString(),
        });
      }, 1000);
    });
  },
};
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'buyer';
  profileInfo?: {
    phone?: string;
    address?: string;
    avatar?: string;
  };
  createdAt: string;
  isVerified?: boolean;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sellerId: string;
  sellerName?: string;
  stock: number;
  condition: 'new' | 'used' | 'refurbished';
  specifications?: { [key: string]: string };
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  buyerId: string;
  buyerName?: string;
  items: {
    productId: string;
    product: Product;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingDetails: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  _id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'seller' | 'buyer';
}
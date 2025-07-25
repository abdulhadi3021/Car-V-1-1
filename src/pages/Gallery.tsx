import React, { useState } from 'react';
import { Upload, Heart, Share2, Eye, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  author: string;
  likes: number;
  views: number;
  category: string;
  description: string;
  isLiked: boolean;
}

const Gallery: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'sports', label: 'Sports Cars' },
    { value: 'classic', label: 'Classic Cars' },
    { value: 'modified', label: 'Modified' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'racing', label: 'Racing' },
  ];

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      title: 'Custom GT-R Build',
      image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
      author: 'Ahmed Khan',
      likes: 245,
      views: 1200,
      category: 'modified',
      description: 'My custom Nissan GT-R with full body kit and performance upgrades.',
      isLiked: false,
    },
    {
      id: '2',
      title: 'Classic Mustang Restoration',
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      author: 'Sarah Ahmed',
      likes: 189,
      views: 890,
      category: 'classic',
      description: '1967 Ford Mustang fully restored to original specifications.',
      isLiked: true,
    },
    {
      id: '3',
      title: 'Lamborghini Aventador',
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
      author: 'Ali Hassan',
      likes: 567,
      views: 2300,
      category: 'luxury',
      description: 'Stunning Lamborghini Aventador in pearl white.',
      isLiked: false,
    },
    {
      id: '4',
      title: 'Track Day Special',
      image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      author: 'Usman Raja',
      likes: 123,
      views: 650,
      category: 'racing',
      description: 'My track-prepped BMW M3 ready for racing action.',
      isLiked: false,
    },
    {
      id: '5',
      title: 'JDM Legend',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      author: 'Hassan Ali',
      likes: 334,
      views: 1500,
      category: 'sports',
      description: 'Toyota Supra MK4 - the ultimate JDM legend.',
      isLiked: true,
    },
    {
      id: '6',
      title: 'German Engineering',
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
      author: 'Fatima Sheikh',
      likes: 278,
      views: 980,
      category: 'luxury',
      description: 'Porsche 911 Turbo S - precision and performance.',
      isLiked: false,
    },
  ]);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleLike = (id: string) => {
    setGalleryItems(items => 
      items.map(item => 
        item.id === id 
          ? { 
              ...item, 
              isLiked: !item.isLiked, 
              likes: item.isLiked ? item.likes - 1 : item.likes + 1 
            }
          : item
      )
    );
  };

  const handleUpload = () => {
    if (!user) {
      toast.error('Please login to upload images');
      return;
    }
    setShowUploadModal(true);
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg')`
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-wider">GALLERY</h1>
            <p className="text-xl text-gray-300">Showcase Your Automotive Passion</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-red-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-red-600 transition-colors">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`p-2 rounded-full ${
                        item.isLiked ? 'bg-red-600 text-white' : 'bg-black bg-opacity-50 text-white'
                      } hover:bg-red-600 transition-colors`}
                    >
                      <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleShare(item)}
                      className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-red-600 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">by {item.author}</p>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    <span className="bg-gray-800 px-2 py-1 rounded-full text-xs capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Upload Photo</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter photo title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600">
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows={3}
                  placeholder="Describe your photo"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Photo</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full">
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-400 mb-2">by {selectedImage.author}</p>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
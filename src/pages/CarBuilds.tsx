import React, { useState } from 'react';
import { Plus, Heart, Share2, Eye, Wrench, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface CarBuild {
  id: string;
  title: string;
  image: string;
  author: string;
  likes: number;
  views: number;
  category: string;
  description: string;
  progress: number;
  startDate: string;
  budget: number;
  modifications: string[];
  isLiked: boolean;
}

const CarBuilds: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBuild, setSelectedBuild] = useState<CarBuild | null>(null);

  const categories = [
    { value: 'all', label: 'All Builds' },
    { value: 'engine', label: 'Engine Builds' },
    { value: 'suspension', label: 'Suspension' },
    { value: 'bodywork', label: 'Body Work' },
    { value: 'interior', label: 'Interior' },
    { value: 'complete', label: 'Complete Builds' },
  ];

  const [carBuilds, setCarBuilds] = useState<CarBuild[]>([
    {
      id: '1',
      title: 'Turbo Civic Build',
      image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
      author: 'Ahmed Khan',
      likes: 342,
      views: 1850,
      category: 'engine',
      description: 'Building a turbo Honda Civic with custom internals and standalone ECU.',
      progress: 75,
      startDate: '2024-01-15',
      budget: 500000,
      modifications: ['Turbo Kit', 'Forged Internals', 'Custom ECU', 'Intercooler', 'Exhaust System'],
      isLiked: false,
    },
    {
      id: '2',
      title: 'Drift Silvia S15',
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      author: 'Hassan Ali',
      likes: 567,
      views: 2340,
      category: 'complete',
      description: 'Complete drift build with SR20DET swap and custom suspension setup.',
      progress: 90,
      startDate: '2023-08-20',
      budget: 800000,
      modifications: ['SR20DET Engine', 'Coilovers', 'LSD', 'Roll Cage', 'Bucket Seats'],
      isLiked: true,
    },
    {
      id: '3',
      title: 'Show Car Interior',
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
      author: 'Fatima Sheikh',
      likes: 234,
      views: 980,
      category: 'interior',
      description: 'Custom leather interior with carbon fiber accents and digital dashboard.',
      progress: 60,
      startDate: '2024-03-10',
      budget: 300000,
      modifications: ['Custom Leather', 'Carbon Fiber Trim', 'Digital Dash', 'Sound System'],
      isLiked: false,
    },
    {
      id: '4',
      title: 'Track Day Preparation',
      image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      author: 'Usman Raja',
      likes: 189,
      views: 750,
      category: 'suspension',
      description: 'Preparing my BMW for track days with suspension and brake upgrades.',
      progress: 45,
      startDate: '2024-02-01',
      budget: 400000,
      modifications: ['Coilovers', 'Big Brake Kit', 'Strut Bars', 'Racing Seats'],
      isLiked: false,
    },
  ]);

  const filteredBuilds = selectedCategory === 'all' 
    ? carBuilds 
    : carBuilds.filter(build => build.category === selectedCategory);

  const handleLike = (id: string) => {
    setCarBuilds(builds => 
      builds.map(build => 
        build.id === id 
          ? { 
              ...build, 
              isLiked: !build.isLiked, 
              likes: build.isLiked ? build.likes - 1 : build.likes + 1 
            }
          : build
      )
    );
  };

  const handleCreateBuild = () => {
    if (!user) {
      toast.error('Please login to create a build project');
      return;
    }
    setShowCreateModal(true);
  };

  const handleShare = (build: CarBuild) => {
    if (navigator.share) {
      navigator.share({
        title: build.title,
        text: build.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg')`
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-wider">CAR BUILDS</h1>
            <p className="text-xl text-gray-300">Document Your Build Journey</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Wrench className="h-5 w-5 text-red-600" />
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

            {/* Create Build Button */}
            <button
              onClick={handleCreateBuild}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Start New Build</span>
            </button>
          </div>
        </div>
      </div>

      {/* Builds Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBuilds.map((build) => (
              <div key={build.id} className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-red-600 transition-colors">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={build.image}
                    alt={build.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={() => setSelectedBuild(build)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                  
                  {/* Progress Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {build.progress}% Complete
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleLike(build.id)}
                      className={`p-2 rounded-full ${
                        build.isLiked ? 'bg-red-600 text-white' : 'bg-black bg-opacity-50 text-white'
                      } hover:bg-red-600 transition-colors`}
                    >
                      <Heart className={`h-4 w-4 ${build.isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleShare(build)}
                      className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-red-600 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{build.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">by {build.author}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{build.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{build.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${build.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Build Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>Started: {formatDate(build.startDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Budget:</span>
                      <span className="font-semibold text-red-600">{formatCurrency(build.budget)}</span>
                    </div>
                  </div>
                  
                  {/* Modifications */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Modifications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {build.modifications.slice(0, 3).map((mod, index) => (
                        <span key={index} className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                          {mod}
                        </span>
                      ))}
                      {build.modifications.length > 3 && (
                        <span className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                          +{build.modifications.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{build.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{build.views}</span>
                      </div>
                    </div>
                    <span className="bg-gray-800 px-2 py-1 rounded-full text-xs capitalize">
                      {build.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Build Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Start New Build Project</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="e.g., Turbo Civic Build"
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
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows={3}
                  placeholder="Describe your build project"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Budget (PKR)</label>
                  <input
                    type="number"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="500000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Planned Modifications</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows={3}
                  placeholder="List your planned modifications (one per line)"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Project Photos</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Build Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Build Detail Modal */}
      {selectedBuild && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative h-64 md:h-96">
                <img
                  src={selectedBuild.image}
                  alt={selectedBuild.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedBuild(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {selectedBuild.progress}% Complete
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-2">{selectedBuild.title}</h3>
                <p className="text-gray-400 mb-4">by {selectedBuild.author}</p>
                <p className="text-gray-300 mb-6">{selectedBuild.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span>{formatDate(selectedBuild.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Budget:</span>
                        <span className="text-red-600 font-semibold">{formatCurrency(selectedBuild.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="capitalize">{selectedBuild.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Progress</h4>
                    <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                      <div 
                        className="bg-red-600 h-4 rounded-full transition-all duration-300" 
                        style={{ width: `${selectedBuild.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400">{selectedBuild.progress}% Complete</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Modifications</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedBuild.modifications.map((mod, index) => (
                      <span key={index} className="bg-gray-800 text-sm px-3 py-2 rounded-lg">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5" />
                      <span>{selectedBuild.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>{selectedBuild.views} views</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLike(selectedBuild.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedBuild.isLiked 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${selectedBuild.isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleShare(selectedBuild)}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarBuilds;
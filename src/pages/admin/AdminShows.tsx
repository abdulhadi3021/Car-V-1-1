import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Calendar, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

interface AutoShow {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  price: number;
  capacity: number;
  registered: number;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  features: string[];
  createdAt: string;
  updatedAt: string;
}

const AdminShows: React.FC = () => {
  const [shows, setShows] = useState<AutoShow[]>([]);
  const [filteredShows, setFilteredShows] = useState<AutoShow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShow, setSelectedShow] = useState<AutoShow | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data
  useEffect(() => {
    const mockShows: AutoShow[] = [
      {
        id: '1',
        title: 'Lahore Auto Expo 2025',
        description: 'The biggest automotive event in Punjab featuring latest cars, custom builds, and auto parts.',
        date: '2025-06-10',
        time: '10:00 AM - 8:00 PM',
        location: 'Expo Centre Lahore',
        city: 'Lahore',
        price: 1500,
        capacity: 5000,
        registered: 3200,
        image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
        status: 'upcoming',
        features: ['Car Display', 'Test Drives', 'Auto Parts Market', 'Food Court', 'Live Music'],
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        title: 'Karachi Motor Show',
        description: 'Southern Pakistan\'s premier automotive showcase with international brands and local dealers.',
        date: '2025-07-05',
        time: '9:00 AM - 9:00 PM',
        location: 'Karachi Expo Centre',
        city: 'Karachi',
        price: 2000,
        capacity: 8000,
        registered: 4500,
        image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
        status: 'upcoming',
        features: ['International Brands', 'Custom Builds', 'Racing Simulators', 'VIP Lounge', 'Workshops'],
        createdAt: '2024-01-10T15:20:00Z',
        updatedAt: '2024-01-10T15:20:00Z',
      },
      {
        id: '3',
        title: 'Islamabad Car Festival',
        description: 'Capital\'s exclusive automotive festival featuring luxury cars and vintage classics.',
        date: '2025-08-20',
        time: '11:00 AM - 7:00 PM',
        location: 'Pakistan Sports Complex',
        city: 'Islamabad',
        price: 1800,
        capacity: 3000,
        registered: 1800,
        image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
        status: 'upcoming',
        features: ['Luxury Cars', 'Vintage Collection', 'Photography Zone', 'Networking', 'Awards Ceremony'],
        createdAt: '2024-01-05T09:15:00Z',
        updatedAt: '2024-01-05T09:15:00Z',
      },
    ];
    
    setShows(mockShows);
    setFilteredShows(mockShows);
  }, []);

  // Filter shows
  useEffect(() => {
    let filtered = shows;

    if (searchTerm) {
      filtered = filtered.filter(show =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(show => show.status === statusFilter);
    }

    setFilteredShows(filtered);
  }, [shows, searchTerm, statusFilter]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewShow = (show: AutoShow) => {
    setSelectedShow(show);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditShow = (show: AutoShow) => {
    setSelectedShow(show);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteShow = (showId: string) => {
    if (window.confirm('Are you sure you want to delete this auto show?')) {
      setShows(shows.filter(show => show.id !== showId));
      toast.success('Auto show deleted successfully');
    }
  };

  const handleSaveShow = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedShow) {
      if (selectedShow.id === 'new') {
        // Create new show
        const newShow = {
          ...selectedShow,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setShows([...shows, newShow]);
        toast.success('Auto show created successfully');
      } else {
        // Update existing show
        setShows(shows.map(show => 
          show.id === selectedShow.id 
            ? { ...selectedShow, updatedAt: new Date().toISOString() }
            : show
        ));
        toast.success('Auto show updated successfully');
      }
      setShowModal(false);
    }
  };

  const handleCreateShow = () => {
    const newShow: AutoShow = {
      id: 'new',
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      city: '',
      price: 0,
      capacity: 0,
      registered: 0,
      image: '',
      status: 'upcoming',
      features: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedShow(newShow);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Auto Shows Management</h1>
            <p className="text-gray-400 mt-2">Manage automotive events and shows</p>
          </div>
          <button
            onClick={handleCreateShow}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Show</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Shows</h3>
            <p className="text-2xl font-bold text-white">{shows.length}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Upcoming</h3>
            <p className="text-2xl font-bold text-blue-500">
              {shows.filter(s => s.status === 'upcoming').length}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Registrations</h3>
            <p className="text-2xl font-bold text-green-500">
              {shows.reduce((sum, show) => sum + show.registered, 0)}
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
            <p className="text-2xl font-bold text-white">
              {formatPrice(shows.reduce((sum, show) => sum + (show.registered * show.price), 0))}
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
                placeholder="Search shows..."
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
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Filter className="h-4 w-4" />
              <span className="text-sm">{filteredShows.length} shows</span>
            </div>
          </div>
        </div>

        {/* Shows Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Show
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Registrations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredShows.map((show) => (
                  <tr key={show.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={show.image}
                          alt={show.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{show.title}</div>
                          <div className="text-sm text-gray-400 line-clamp-1">{show.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-red-600" />
                        <div>
                          <div className="text-white">{formatDate(show.date)}</div>
                          <div className="text-gray-400 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {show.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{formatPrice(show.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-white">
                          {show.registered}/{show.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                        <div 
                          className="bg-green-500 h-1 rounded-full" 
                          style={{ width: `${(show.registered / show.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(show.status)}`}>
                        {show.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewShow(show)}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditShow(show)}
                          className="text-yellow-600 hover:text-yellow-500"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteShow(show.id)}
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

        {/* Show Modal */}
        {showModal && selectedShow && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {isEditing ? (selectedShow.id === 'new' ? 'Add Auto Show' : 'Edit Auto Show') : 'Show Details'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveShow} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={selectedShow.title}
                        onChange={(e) => setSelectedShow({...selectedShow, title: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        value={selectedShow.city}
                        onChange={(e) => setSelectedShow({...selectedShow, city: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={selectedShow.description}
                      onChange={(e) => setSelectedShow({...selectedShow, description: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <input
                        type="date"
                        value={selectedShow.date}
                        onChange={(e) => setSelectedShow({...selectedShow, date: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time</label>
                      <input
                        type="text"
                        value={selectedShow.time}
                        onChange={(e) => setSelectedShow({...selectedShow, time: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="10:00 AM - 8:00 PM"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={selectedShow.location}
                      onChange={(e) => setSelectedShow({...selectedShow, location: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price (PKR)</label>
                      <input
                        type="number"
                        value={selectedShow.price}
                        onChange={(e) => setSelectedShow({...selectedShow, price: parseFloat(e.target.value)})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Capacity</label>
                      <input
                        type="number"
                        value={selectedShow.capacity}
                        onChange={(e) => setSelectedShow({...selectedShow, capacity: parseInt(e.target.value)})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select
                        value={selectedShow.status}
                        onChange={(e) => setSelectedShow({...selectedShow, status: e.target.value as any})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="url"
                      value={selectedShow.image}
                      onChange={(e) => setSelectedShow({...selectedShow, image: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
                    <input
                      type="text"
                      value={selectedShow.features.join(', ')}
                      onChange={(e) => setSelectedShow({...selectedShow, features: e.target.value.split(', ').filter(f => f.trim())})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Car Display, Test Drives, Food Court"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {selectedShow.id === 'new' ? 'Create Show' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
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
                        src={selectedShow.image}
                        alt={selectedShow.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg">{selectedShow.title}</h4>
                        <p className="text-gray-400">{selectedShow.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400">Date</label>
                          <p className="font-medium">{formatDate(selectedShow.date)}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Time</label>
                          <p className="font-medium">{selectedShow.time}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Location</label>
                          <p className="font-medium">{selectedShow.location}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">City</label>
                          <p className="font-medium">{selectedShow.city}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Price</label>
                          <p className="font-medium text-red-600">{formatPrice(selectedShow.price)}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Status</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedShow.status)}`}>
                            {selectedShow.status}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400">Registrations</label>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{selectedShow.registered}/{selectedShow.capacity}</span>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(selectedShow.registered / selectedShow.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">Features</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedShow.features.map((feature, index) => (
                        <span key={index} className="bg-gray-800 text-sm px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Edit Show
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
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

export default AdminShows;
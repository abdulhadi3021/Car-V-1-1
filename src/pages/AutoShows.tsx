import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface AutoShow {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  registered: number;
  rating: number;
  features: string[];
}

const AutoShows: React.FC = () => {
  const { user } = useAuth();
  const [selectedShow, setSelectedShow] = useState<AutoShow | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const autoShows: AutoShow[] = [
    {
      id: '1',
      title: 'Lahore Auto Expo 2025',
      date: 'June 10, 2025',
      time: '10:00 AM - 8:00 PM',
      location: 'Expo Centre Lahore',
      city: 'Lahore',
      description: 'The biggest automotive event in Punjab featuring latest cars, custom builds, and auto parts.',
      image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
      price: 1500,
      capacity: 5000,
      registered: 3200,
      rating: 4.8,
      features: ['Car Display', 'Test Drives', 'Auto Parts Market', 'Food Court', 'Live Music']
    },
    {
      id: '2',
      title: 'Karachi Motor Show',
      date: 'July 05, 2025',
      time: '9:00 AM - 9:00 PM',
      location: 'Karachi Expo Centre',
      city: 'Karachi',
      description: 'Southern Pakistan\'s premier automotive showcase with international brands and local dealers.',
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      price: 2000,
      capacity: 8000,
      registered: 4500,
      rating: 4.9,
      features: ['International Brands', 'Custom Builds', 'Racing Simulators', 'VIP Lounge', 'Workshops']
    },
    {
      id: '3',
      title: 'Islamabad Car Festival',
      date: 'August 20, 2025',
      time: '11:00 AM - 7:00 PM',
      location: 'Pakistan Sports Complex',
      city: 'Islamabad',
      description: 'Capital\'s exclusive automotive festival featuring luxury cars and vintage classics.',
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
      price: 1800,
      capacity: 3000,
      registered: 1800,
      rating: 4.7,
      features: ['Luxury Cars', 'Vintage Collection', 'Photography Zone', 'Networking', 'Awards Ceremony']
    }
  ];

  const handleBooking = (show: AutoShow) => {
    if (!user) {
      toast.error('Please login to register for auto shows');
      return;
    }
    setSelectedShow(show);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    if (selectedShow) {
      toast.success(`Successfully registered for ${selectedShow.title}!`);
      setShowBookingModal(false);
      setSelectedShow(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg')`
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-wider">AUTO SHOWS</h1>
            <p className="text-xl text-gray-300">Experience Pakistan's Premier Automotive Events</p>
          </div>
        </div>
      </div>

      {/* Auto Shows Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {autoShows.map((show) => (
              <div key={show.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-red-600 transition-colors">
                <div className="relative h-64">
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {formatPrice(show.price)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{show.title}</h3>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(show.rating)}
                    <span className="text-sm text-gray-400 ml-2">({show.rating})</span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{show.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span>{show.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span>{show.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>{show.location}, {show.city}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-red-600" />
                      <span>{show.registered}/{show.capacity} registered</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {show.features.map((feature, index) => (
                        <span key={index} className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${(show.registered / show.capacity) * 100}%` }}
                    ></div>
                  </div>
                  
                  <button
                    onClick={() => handleBooking(show)}
                    disabled={show.registered >= show.capacity}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {show.registered >= show.capacity ? 'SOLD OUT' : 'REGISTER NOW'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedShow && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Confirm Registration</h3>
            <div className="mb-6">
              <h4 className="font-semibold text-lg">{selectedShow.title}</h4>
              <p className="text-gray-400">{selectedShow.date} at {selectedShow.location}</p>
              <p className="text-red-600 font-bold text-xl mt-2">{formatPrice(selectedShow.price)}</p>
            </div>
            
            <div className="mb-6">
              <h5 className="font-semibold mb-2">Registration includes:</h5>
              <ul className="text-sm text-gray-400 space-y-1">
                {selectedShow.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoShows;
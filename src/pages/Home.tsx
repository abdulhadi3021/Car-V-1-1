import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, Wrench, Car, Trophy, Camera, UserPlus, Settings } from 'lucide-react';

import { FaWrench, FaCar, FaCalendarAlt, FaCogs, FaCamera, FaUserPlus } from 'react-icons/fa';


const Home: React.FC = () => {
  const features = [
    {
      icon: (
        // 🛠 Auto Parts - Toolbox Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="#e11d48" viewBox="0 0 24 24">
          <path d="M4 7V5a2 2 0 012-2h3v2H6v2h12V5h-3V3h3a2 2 0 012 2v2h1a1 1 0 011 1v4h-2v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9H2V8a1 1 0 011-1h1zm0 4v8h16v-8H4z" />
        </svg>
      ),
      title: 'AUTO PARTS',
      description: 'Quality parts for all makes and models',
      link: '/products',
    },
    {
      icon: (
        // 🚗 Car Icon (Front View)
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="#e11d48" viewBox="0 0 24 24">
          <path d="M5 16a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4zM5 6l1.5-4h11L19 6h1a2 2 0 012 2v5h-2v-2H4v2H2V8a2 2 0 012-2h1zM6.85 6h10.3L16.5 4h-9L6.85 6z" />
        </svg>
      ),
      title: 'CARS FOR SALE',
      description: 'Browse premium vehicles',
      link: '/cars',
    },
    {
      icon: (
        // 📅 Event Calendar Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="#e11d48" viewBox="0 0 24 24">
          <path d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 6H5v12h14V8z" />
        </svg>
      ),
      title: 'AUTO SHOWS',
      description: 'Join exciting car events',
      link: '/shows',
    },
    {
      icon: (
        // ⚙️ Car Build - Gear + Wrench Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="#e11d48" viewBox="0 0 24 24">
          <path d="M22.7 19.3l-5.6-5.6c1.3-2.2 1-5-1-6.9s-4.7-2.3-6.9-1l2.2 2.2L4.8 9.5 2 6.8l3.2-3.2c-1.3-2.2-1-5 1-6.9s4.7-2.3 6.9-1l5.6 5.6c.4.4.4 1 0 1.4l-4.1 4.1c-.4.4-1 .4-1.4 0z" />
        </svg>
      ),
      title: 'CAR BUILDS',
      description: 'Custom build projects',
      link: '/builds',
    },
    {
      icon: (
        // 📷 Camera Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="#e11d48" viewBox="0 0 24 24">
          <path d="M20 5h-3.17l-1.84-2.26A1 1 0 0014.17 2H9.83c-.32 0-.62.15-.82.39L7.17 5H4a2 2 0 00-2 2v13a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2zm-8 14a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
      ),
      title: 'GALLERY',
      description: 'Showcase your ride',
      link: '/gallery',
    },
    {
      icon: (
        // 🧍➕ User Plus Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="#e11d48" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm4 2h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2zm-6 1c-2.33 0-7 1.17-7 3.5V20h7v-2.5c0-.83.67-1.5 1.5-1.5H18v-1c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      title: 'REGISTRATION',
      description: 'Join our community',
      link: '/register',
    },
  ];

  // rest of your component...
};




  const autoPartCategories = [
    {
      title: 'Engine',
      image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg',
      link: '/products?category=engine',
    },
    {
      title: 'Body',
      image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg',
      link: '/products?category=body',
    },
    {
      title: 'Wheels',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      link: '/products?category=wheels',
    },
    {
      title: 'Electronics',
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      link: '/products?category=electronics',
    },
  ];

  const upcomingShows = [
    {
      month: 'JUN',
      date: '10',
      city: 'Lahore',
      link: '/shows/lahore',
    },
    {
      month: 'JUL',
      date: '05',
      city: 'Karachi',
      link: '/shows/karachi',
    },
    {
      month: 'AUG',
      date: '20',
      city: 'Islamabad',
      link: '/shows/islamabad',
    },
  ];

  const enthusiastHighlights = [
    {
      image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
      title: 'Custom GT-R Build',
    },
    {
      image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      title: 'Sports Car Showcase',
    },
    {
      image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
      title: 'Classic Restoration',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              WELCOME TO MCP
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Join the growing community of car enthusiasts across Pakistan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                REGISTER FOR AUTO SHOW
              </Link>
              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                EXPLORE AUTO PARTS
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group text-center"
              >
                <div className="flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="text-red-500 group-hover:text-red-400 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Auto Parts */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            POPULAR AUTO PARTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {autoPartCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Auto Shows */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            UPCOMING AUTO SHOWS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingShows.map((show, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-8 text-center">
                <div className="text-red-500 text-sm font-semibold mb-2">
                  {show.month}
                </div>
                <div className="text-white text-5xl font-bold mb-4">
                  {show.date}
                </div>
                <div className="text-white text-xl font-semibold mb-6">
                  {show.city}
                </div>
                <Link
                  to={show.link}
                  className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  REGISTER NOW
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enthusiast Highlights */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            ENTHUSIAST HIGHLIGHTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enthusiastHighlights.map((highlight, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg aspect-video">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-bold">
                    {highlight.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
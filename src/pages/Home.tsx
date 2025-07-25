import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Car, Calendar, Cog, Camera, UserPlus } from 'lucide-react';

const Home: React.FC = () => {
  const quickMenuItems = [
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'AUTO PARTS',
      link: '/products',
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'CARS FOR SALE',
      link: '/cars',
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'AUTO SHOWS',
      link: '/auto-shows',
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: 'CAR BUILDS',
      link: '/car-builds',
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'GALLERY',
      link: '/gallery',
    },
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: 'REGISTRATION',
      link: '/register',
    },
  ];

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
      link: '/auto-shows/lahore',
    },
    {
      month: 'JUL',
      date: '05',
      city: 'Karachi',
      link: '/auto-shows/karachi',
    },
    {
      month: 'AUG',
      date: '20',
      city: 'Islamabad',
      link: '/auto-shows/islamabad',
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
    {
      image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      title: 'Modified Supercar',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-wider">
              WELCOME TO MCP
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 font-medium">
              Join the growing community of car enthusiasts across Pakistan.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/auto-shows"
                className="bg-red-600 text-white px-10 py-4 text-lg font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105"
              >
                REGISTER FOR AUTO SHOW
              </Link>
              <Link
                to="/products"
                className="bg-black border-2 border-white text-white px-10 py-4 text-lg font-bold rounded-lg hover:bg-white hover:text-black transition-colors transform hover:scale-105"
              >
                EXPLORE AUTO PARTS
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Menu Section */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group text-center"
              >
                <div className="bg-black border-2 border-red-600 p-8 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                  <div className="text-red-600 group-hover:text-white transition-colors mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold text-sm tracking-wider">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Auto Parts */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-wider">
            POPULAR AUTO PARTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {autoPartCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-black tracking-wider">
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
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-wider">
            UPCOMING AUTO SHOWS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingShows.map((show, index) => (
              <div key={index} className="bg-black border border-gray-700 rounded-lg p-8 text-center hover:border-red-600 transition-colors">
                <div className="text-red-600 text-lg font-bold mb-2 tracking-wider">
                  {show.month}
                </div>
                <div className="text-white text-6xl font-black mb-6">
                  {show.date}
                </div>
                <div className="text-white text-2xl font-bold mb-8 tracking-wider">
                  {show.city}
                </div>
                <Link
                  to={show.link}
                  className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors transform hover:scale-105"
                >
                  REGISTER NOW
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enthusiast Highlights */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-wider">
            ENTHUSIAST HIGHLIGHTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enthusiastHighlights.map((highlight, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg aspect-video">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-bold tracking-wider">
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
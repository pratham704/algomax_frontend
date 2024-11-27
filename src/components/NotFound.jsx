import React from 'react';
import { 
  Ghost,
  Search,
  Navigation,
  Compass,
  Map,
  Home,
  ArrowLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    setShowIcons(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
    });
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Floating background icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Map className={`absolute top-0 left-10 opacity-10 w-12 h-12 transition-all duration-700 ${showIcons ? 'translate-y-0 opacity-10' : '-translate-y-20 opacity-0'}`} />
          <Compass className={`absolute top-20 right-0 opacity-10 w-8 h-8 transition-all duration-700 delay-100 ${showIcons ? 'translate-x-0 opacity-10' : 'translate-x-20 opacity-0'}`} />
          <Navigation className={`absolute bottom-0 left-0 opacity-10 w-10 h-10 transition-all duration-700 delay-200 ${showIcons ? 'translate-y-0 opacity-10' : 'translate-y-20 opacity-0'}`} />
        </div>

        {/* Main content */}
        <div 
          className="relative transform transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        >
          <Ghost 
            className="mx-auto mb-8 w-32 h-32 text-blue-400 animate-bounce"
          />
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            404
          </h1>
          
          <p className="text-2xl mb-8 text-gray-400">
            Oops! Looks like you've gotten lost in space
          </p>

          <Search className="mx-auto mb-8 w-16 h-16 text-gray-600 animate-pulse" />
          
          <div className="space-x-4"
            onClick={() => navigate('/')}
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button>
            
            <button className="border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
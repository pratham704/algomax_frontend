import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  Music, 
  Tag, 
  DollarSign, 
  X, 
  Search, 
  Filter, 
  ChevronDown,
  Star,
  TrendingUp,
  SlidersHorizontal,
  ListFilter
} from 'lucide-react';
import { baseUrl } from '../../../api/baseUrl';
import EventModal from '../../../components/modals/EventModal';

// Categories and Expanded Cities
const categories = [
  'Concert', 'Music', 'Technology', 'Food', 'Sports', 
  'Art', 'Business', 'Education', 'Comedy', 'Workshop'
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 
  'Chandigarh', 'Kochi', 'Indore', 'Bhopal', 'Nagpur',
  'Gurgaon', 'Noida', 'Surat', 'Vadodara', 'Patna' , 'Belagavi'
];

const CategoryDropdown = ({ categories, onSelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        <Tag className="mr-2 text-purple-400" />
        {selectedCategory || 'Categories'}
        <ChevronDown className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          <div className="p-2">
            {categories.map((category) => (
              <div 
                key={category}
                onClick={() => {
                  onSelect(category);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer ${selectedCategory === category ? 'bg-purple-600 text-white' : 'text-gray-300'}`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CityDropdown = ({ cities, onSelect, selectedCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchCity, setSearchCity] = useState('');

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        <MapPin className="mr-2 text-purple-400" />
        {selectedCity || 'Cities'}
        <ChevronDown className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl">
          <div className="p-2">
            <div className="relative mb-2">
              <input 
                type="text"
                placeholder="Search cities..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredCities.map((city) => (
                <div 
                  key={city}
                  onClick={() => {
                    onSelect(city);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-700 rounded-lg cursor-pointer ${selectedCity === city ? 'bg-purple-600 text-white' : 'text-gray-300'}`}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-purple-500/30 transition-all duration-300"
  >
    <div className="relative">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-48 object-cover" 
      />
      {event.is_trending && (
        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <TrendingUp size={16} className="mr-1" /> Trending
        </div>
      )}
    </div>
    <div className="p-5">
      <h2 className="text-xl font-bold text-white mb-2 truncate">{event.title}</h2>
      <p className="text-gray-400 mb-4 line-clamp-2 text-sm">{event.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-300 text-sm">
          <MapPin className="w-4 h-4 mr-2 text-purple-500" />
          <span className="truncate">{event.location}, {event.city}</span>
        </div>
        
        <div className="flex items-center text-gray-300 text-sm">
          <Calendar className="w-4 h-4 mr-2 text-purple-500" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-300">
            <Ticket className="w-4 h-4 mr-2 text-purple-500" />
            <span>₹{event.ticket_price}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{Math.max(0, event.available_tickets)} left</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Filtering and Sorting States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [showTrending, setShowTrending] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(9);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${baseUrl}/user/get-all-events`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    let result = events;

    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(event => event.category === selectedCategory);
    }

    if (selectedCity) {
      result = result.filter(event => event.city === selectedCity);
    }

    if (showTrending) {
      result = result.filter(event => event.is_trending);
    }

    result.sort((a, b) => {
      switch(sortBy) {
        case 'price':
          return a.ticket_price - b.ticket_price;
        case 'popularity':
          return b.available_tickets - a.available_tickets;
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });

    return result;
  }, [events, searchTerm, selectedCategory, selectedCity, sortBy, showTrending]);

  const lastTicketsEvents = filteredEvents.filter(event => event.available_tickets <= 10);
  const fastestFillingEvents = filteredEvents.sort((a, b) => 
    (b.total_tickets - b.available_tickets) - (a.total_tickets - a.available_tickets)
  ).slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Explore Events
          </h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-grow max-w-md">
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <CategoryDropdown 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />

              <CityDropdown 
                cities={cities}
                selectedCity={selectedCity}
                onSelect={setSelectedCity}
              />

              <button 
                onClick={() => setShowTrending(!showTrending)}
                className={`${showTrending ? 'bg-purple-600' : 'bg-gray-700'} text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center`}
              >
                <TrendingUp className="mr-2" />
                Trending
              </button>

              <select 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Last Tickets Section */}
        {lastTicketsEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="mr-3 text-yellow-500" /> Last Tickets Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lastTicketsEvents.slice(0, 3).map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Fastest Filling Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="mr-3 text-green-500" /> Fastest Filling Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fastestFillingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </section>

        {/* All Events Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Music className="mr-3 text-purple-500" /> All Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(0, displayLimit).map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {filteredEvents.length > displayLimit && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setDisplayLimit(prev => prev + 6)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300"
              >
                <ChevronDown className="inline mr-2" /> Load More Events
              </button>
            </div>
          )}

          {/* No Events Found */}
          {filteredEvents.length === 0 && (
            <div className="text-center text-gray-400 mt-16 bg-gray-800 p-8 rounded-lg">
              <Filter className="mx-auto mb-4 text-purple-500" size={48} />
              <p className="text-2xl mb-4 text-white">No Events Found</p>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSelectedCity(null);
                  setShowTrending(false);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Event Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <EventModal 
              event={selectedEvent} 
              onClose={() => setSelectedEvent(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExploreEvents;
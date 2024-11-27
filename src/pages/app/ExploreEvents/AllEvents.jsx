import React from 'react'
import { Calendar, MapPin, Clock, Ticket, DollarSign, Users, Tag, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const events = [
  {
    id: '1',
    organizer_id: 'org1', 
    title: 'Summer Music Festival',
    description: 'A fantastic outdoor music festival featuring top artists',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    location: 'Central Park, New York',
    date: '2024-07-15',
    time: '16:00:00',
    category: 'Music',
    ticket_price: 49.99,
    total_tickets: 1000,
    created_at: '2024-01-20 10:00:00'
  },
  {
    id: '2',
    organizer_id: 'org2',
    title: 'Tech Conference 2024',
    description: 'Join industry leaders for cutting-edge tech discussions',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    location: 'Moscone Center, San Francisco',
    date: '2024-08-20',
    time: '09:00:00', 
    category: 'Technology',
    ticket_price: 299.99,
    total_tickets: 500,
    created_at: '2024-01-21 11:30:00'
  },
  {
    id: '3',
    organizer_id: 'org3',
    title: 'Food & Wine Festival',
    description: 'Experience culinary delights from top chefs worldwide',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    location: 'Marina Bay Sands, Singapore',
    date: '2024-09-10',
    time: '12:00:00',
    category: 'Food & Drink',
    ticket_price: 75.00,
    total_tickets: 750,
    created_at: '2024-01-22 09:15:00'
  },
  {
    id: '4',
    organizer_id: 'org4',
    title: 'Art Gallery Opening',
    description: 'Contemporary art showcase featuring emerging artists',
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e',
    location: 'Modern Art Museum, London',
    date: '2024-10-05',
    time: '18:30:00',
    category: 'Art',
    ticket_price: 25.00,
    total_tickets: 200,
    created_at: '2024-01-23 14:45:00'
  },
  {
    id: '5',
    organizer_id: 'org5',
    title: 'Sports Championship Finals',
    description: 'Witness the ultimate showdown in professional sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
    location: 'Olympic Stadium, Tokyo',
    date: '2024-11-15',
    time: '19:00:00',
    category: 'Sports',
    ticket_price: 150.00,
    total_tickets: 5000,
    created_at: '2024-01-24 16:20:00'
  },
  // Add more events as needed
]
const AllEvents = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Upcoming Events
        </h1>
        
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text" 
                placeholder="Search events..."
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filtered = events.filter(event => 
                    event.title.toLowerCase().includes(searchTerm) ||
                    event.description.toLowerCase().includes(searchTerm) ||
                    event.location.toLowerCase().includes(searchTerm)
                  );
                  setFilteredEvents(filtered);
                }}
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-lg px-4 py-3 pl-12 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <select 
                onChange={(e) => {
                  const category = e.target.value;
                  const filtered = category ? 
                    events.filter(event => event.category === category) : 
                    events;
                  setFilteredEvents(filtered);
                }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              >
                <option value="">All Categories</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Art">Art</option>
                <option value="Food & Drink">Food & Drink</option>
              </select>
              
              <select 
                onChange={(e) => {
                  const sortBy = e.target.value;
                  const sorted = [...filteredEvents].sort((a, b) => {
                    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
                    if (sortBy === 'price') return a.ticket_price - b.ticket_price;
                    if (sortBy === 'name') return a.title.localeCompare(b.title);
                    return 0;
                  });
                  setFilteredEvents(sorted);
                }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              >
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                const filtered = events.filter(event => event.date === today);
                setFilteredEvents(filtered);
              }}
              className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all duration-200"
            >
              Today
            </button>
            <button 
              onClick={() => {
                const today = new Date();
                const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                const filtered = events.filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate >= today && eventDate <= weekLater;
                });
                setFilteredEvents(filtered);
              }}
              className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-200"
            >
              This Week
            </button>
            <button 
              onClick={() => {
                const filtered = events.filter(event => event.ticket_price === 0);
                setFilteredEvents(filtered);
              }}
              className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-200"
            >
              Free Events
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="group bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700/50"
            >
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {event.title}
                </h2>
                
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold">${event.ticket_price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{event.total_tickets} available</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    document.getElementById(`modal-${event.id}`).showModal();
                  }}
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium"
                >
                  <Info className="w-4 h-4" />
                  View Details
                </button>
              </div>

              {/* Modal */}
              <dialog 
                id={`modal-${event.id}`} 
                className="modal backdrop:bg-gray-900/90 bg-transparent"
              >
                <div className="bg-gray-800/95 backdrop-blur-xl p-8 rounded-2xl w-[90vw] max-w-2xl border border-gray-700/50 shadow-2xl">
                  <div className="relative">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button 
                      onClick={() => document.getElementById(`modal-${event.id}`).close()}
                      className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm p-2 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold mt-6 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {event.title}
                  </h3>

                  <p className="text-gray-300 mb-6">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400">Date</p>
                          <p className="text-gray-200">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-sm text-gray-400">Time</p>
                          <p className="text-gray-200">{event.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-gray-200">{event.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                        <div>
                          <p className="text-sm text-gray-400">Price</p>
                          <p className="text-gray-200">${event.ticket_price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Ticket className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-sm text-gray-400">Available Tickets</p>
                          <p className="text-gray-200">{event.total_tickets}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-sm text-gray-400">Category</p>
                          <p className="text-gray-200">{event.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium">
                      <Ticket className="w-5 h-5" />
                      Book Now
                    </button>
                    <button 
                      onClick={() => document.getElementById(`modal-${event.id}`).close()}
                      className="px-6 py-3 border border-gray-600 hover:border-gray-500 rounded-lg text-gray-300 hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllEvents

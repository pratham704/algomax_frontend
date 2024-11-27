import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { baseUrl } from '../../../../api/baseUrl';
import { Calendar, Clock, MapPin, Users, DollarSign, Tag, BarChart2, X, Ticket, Info, Star, Globe, Music, Camera, Film, Sparkles, Heart, Share2, Award, TrendingUp, Zap, Gift, CalendarPlus, PartyPopper } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GetMyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast.error('Please login first');
        return;
      }

      const response = await axios.get(`${baseUrl}/organizer/get-events`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const EventModal = ({ event, onClose }) => {
    const data = [
      {
        name: 'Tickets',
        total: event.total_tickets,
        available: event.available_tickets,
        sold: event.total_tickets - event.available_tickets
      }
    ];

    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-gray-950 to-gray-900 p-8 rounded-3xl w-[95%] max-w-6xl max-h-[95vh] overflow-y-auto border border-gray-800 shadow-2xl shadow-black/50"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                  <Sparkles className="text-blue-400" size={32} />
                  {event.title}
                </h2>
                <p className="text-gray-400 mt-2 flex items-center gap-2">
                  <Info size={18} />
                  Event Details
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate(`/organizer/my-events/${event.id}`)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CalendarPlus size={18} />
                  Edit Event
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all">
                  <Share2 size={20} />
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all">
                  <Heart size={20} />
                </button>
                <button 
                  onClick={onClose} 
                  className="p-2 rounded-full bg-gray-800 hover:bg-red-900/50 text-gray-300 hover:text-red-400 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="relative group rounded-2xl overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-4">
                      <span className="bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-200 flex items-center gap-2">
                        <Camera size={16} />
                        View Gallery
                      </span>
                      <span className="bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-200 flex items-center gap-2">
                        <Film size={16} />
                        Watch Teaser
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-2xl p-6 space-y-4 backdrop-blur-sm border border-gray-800">
                  <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <Globe className="mr-3" size={22} />
                    <span className="text-lg">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <Calendar className="mr-3" size={22} />
                    <span className="text-lg">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <Clock className="mr-3" size={22} />
                    <span className="text-lg">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <Music className="mr-3" size={22} />
                    <span className="text-lg">{event.category}</span>
                  </div>
                  <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <DollarSign className="mr-3" size={22} />
                    <span className="text-lg font-semibold">${event.ticket_price}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800">
                  <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                    <TrendingUp className="text-blue-400" />
                    Ticket Analytics
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#111827',
                            border: '1px solid #1f2937',
                            borderRadius: '1rem',
                            color: '#fff'
                          }} 
                        />
                        <Bar dataKey="total" fill="#3b82f6" name="Total Tickets" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="available" fill="#10b981" name="Available Tickets" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="sold" fill="#f59e0b" name="Sold Tickets" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800">
                  <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                    <Award className="text-blue-400" />
                    Event Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <Zap className="text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Special Guests</h4>
                      <p className="text-gray-400 text-sm">Celebrity appearances</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <Gift className="text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Exclusive Perks</h4>
                      <p className="text-gray-400 text-sm">VIP benefits included</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500">
          <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-blue-400 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-lg"
        >
          <div className="flex justify-center space-x-4">
            <PartyPopper className="text-pink-500" size={40} />
            <CalendarPlus className="text-blue-500" size={40} />
            <Sparkles className="text-purple-500" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-white">No Events Yet!</h2>
          <p className="text-gray-400 text-lg">
            Start creating amazing events and make unforgettable memories with your audience.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/organizer/add-event')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
          >
            <CalendarPlus size={24} />
            Create Your First Event
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
        <Star className="text-blue-400" />
        My Events
      </h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {events.map((event) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            key={event.id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/20 transition-all duration-500 cursor-pointer border border-gray-800"
            onClick={() => {
              setSelectedEvent(event);
              setShowModal(true);
            }}
          >
            <div className="relative group">
              <img src={event.image} alt={event.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4 hover:text-blue-400 transition-colors">{event.title}</h2>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <MapPin className="mr-3" size={18} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <Calendar className="mr-3" size={18} />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <Ticket className="mr-3" size={18} />
                  <span>{event.available_tickets} tickets available</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-blue-400 font-bold text-xl">${event.ticket_price}</span>
                <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-700 transition-all duration-300 flex items-center gap-2">
                  <Info size={18} />
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {showModal && selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default GetMyEvents

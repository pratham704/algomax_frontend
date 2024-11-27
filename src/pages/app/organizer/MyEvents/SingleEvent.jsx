import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../api/baseUrl";
import { Calendar, Clock, MapPin, DollarSign, Users, Tag, BarChart2, Save, X, Ticket, Edit2, Globe, Music, Camera, Film, Sparkles, Heart, Share2, Award, TrendingUp, Zap, Gift, CalendarPlus, PartyPopper, Star, Download, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const SingleEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaving, setIsSaving] = useState(false);

  const LoadingSpinner = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-gray-900/90 p-8 rounded-2xl flex flex-col items-center gap-4 border border-gray-800 shadow-xl"
      >
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin absolute top-2 left-2" />
        </div>
        <p className="text-gray-300 text-lg font-medium">
          {isSaving ? "Saving changes..." : "Loading event details..."}
        </p>
      </motion.div>
    </motion.div>
  );

  const fetchEvent = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/organizer/get-single-event?eventId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setEvent(response.data.data[0]);
    } catch (error) {
      toast.error("Error fetching event details", {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field, value) => {
    if (event[field] !== value) {
      setEditedFields(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    if (Object.keys(editedFields).length > 0) {
      setIsSaving(true);
      try {
        await axios.post(
          `${baseUrl}/organizer/update-event`,
          {
            eventId: id,
            ...editedFields,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        
        toast.success("Event updated successfully", {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setIsEditing(false);
        await fetchEvent();
        setEditedFields({});
      } catch (error) {
        toast.error("Error updating event", {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const GalleryModal = () => (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-gray-950 to-gray-900 p-8 rounded-3xl w-[95%] max-w-6xl border border-gray-800 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              <Camera className="text-blue-400" />
              Event Gallery
            </h3>
            <button
              onClick={() => setShowGalleryModal(false)}
              className="p-3 rounded-full bg-gray-800/80 hover:bg-red-900/50 text-gray-300 hover:text-red-400 transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[event.image, event.image, event.image].map((img, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="relative group rounded-2xl overflow-hidden shadow-xl"
              >
                <img src={img} alt="" className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center gap-2 hover:bg-white/30 transition-all">
                      <Download size={16} />
                      Download
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) return null;

  const ticketData = [
    {
      name: 'Tickets',
      total: event.total_tickets,
      available: event.available_tickets,
      sold: event.total_tickets - event.available_tickets
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 p-8">
      {isSaving && <LoadingSpinner />}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              {isEditing ? (
                <input
                  type="text"
                  value={editedFields.title || event.title}
                  onChange={(e) => handleEdit('title', e.target.value)}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <>
                  <Sparkles className="text-blue-400" size={32} />
                  {event.title}
                </>
              )}
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <Calendar size={18} />
              Created on {new Date(event.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Save size={20} />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedFields({});
                  }}
                  className="px-6 py-3 rounded-full bg-gray-800 text-gray-300 hover:bg-red-900/50 hover:text-red-400 transition-all duration-300 flex items-center gap-2"
                >
                  <X size={20} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
              >
                <Edit2 size={20} />
                Edit Event
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative group rounded-2xl overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowGalleryModal(true)}
                    className="bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-200 flex items-center gap-2 hover:bg-gray-800 transition-all"
                  >
                    <Camera size={16} />
                    View Gallery
                  </button>
                  <button className="bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-200 flex items-center gap-2 hover:bg-gray-800 transition-all">
                    <Film size={16} />
                    Watch Teaser
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-full ${
                    activeTab === 'overview'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } transition-all duration-300 flex items-center gap-2`}
                >
                  {/* <Info size={18} /> */}
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-full ${
                    activeTab === 'analytics'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } transition-all duration-300 flex items-center gap-2`}
                >
                  <BarChart2 size={18} />
                  Analytics
                </button>
              </div>

              {activeTab === 'overview' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <Globe className="text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Location</h4>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedFields.location || event.location}
                          onChange={(e) => handleEdit('location', e.target.value)}
                          className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-400 text-sm">{event.location}</p>
                      )}
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <Calendar className="text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Date & Time</h4>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="date"
                            value={editedFields.date || event.date}
                            onChange={(e) => handleEdit('date', e.target.value)}
                            className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm w-full focus:outline-none focus:border-blue-500"
                          />
                          <input
                            type="time"
                            value={editedFields.time || event.time}
                            onChange={(e) => handleEdit('time', e.target.value)}
                            className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm w-full focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <Music className="text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Category</h4>
                      {isEditing ? (
                        <select
                          value={editedFields.category || event.category}
                          onChange={(e) => handleEdit('category', e.target.value)}
                          className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm w-full mt-1 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Music">Music</option>
                          <option value="Sports">Sports</option>
                          <option value="Arts">Arts</option>
                          <option value="Technology">Technology</option>
                        </select>
                      ) : (
                        <p className="text-gray-400 text-sm">{event.category}</p>
                      )}
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <DollarSign className="text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Ticket Price</h4>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editedFields.ticket_price || event.ticket_price}
                          onChange={(e) => handleEdit('ticket_price', e.target.value)}
                          className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm w-full mt-1 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-400 text-sm">${event.ticket_price}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-6 rounded-xl">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Tag className="text-blue-400" />
                      Description
                    </h4>
                    {isEditing ? (
                      <textarea
                        value={editedFields.description || event.description}
                        onChange={(e) => handleEdit('description', e.target.value)}
                        rows={6}
                        className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white w-full focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-400 leading-relaxed">{event.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <Award className="text-blue-400 mb-2" />
                      <h4 className="font-semibold text-white">Achievements</h4>
                      <p className="text-gray-400 text-sm">Event milestones</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="bg-gray-800/50 p-6 rounded-xl">
                    <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
                      <Ticket className="text-blue-400" />
                      Ticket Analytics
                    </h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ticketData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1F2937',
                              border: 'none',
                              borderRadius: '0.5rem',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            }}
                          />
                          <Bar dataKey="total" name="Total Tickets" fill={COLORS[0]} />
                          <Bar dataKey="available" name="Available" fill={COLORS[1]} />
                          <Bar dataKey="sold" name="Sold" fill={COLORS[2]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">Total Revenue</h4>
                        <DollarSign className="text-blue-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">
                        ${(event.ticket_price * (event.total_tickets - event.available_tickets)).toLocaleString()}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">From ticket sales</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">Tickets Sold</h4>
                        <Ticket className="text-blue-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">
                        {(event.total_tickets - event.available_tickets).toLocaleString()}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">Out of {event.total_tickets}</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">Engagement</h4>
                        <Users className="text-blue-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">89%</p>
                      <p className="text-gray-400 text-sm mt-2">Attendance rate</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="text-blue-400" />
                Quick Actions
              </h3>
              <div className="space-y-4">
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Send className="text-blue-400" size={20} />
                  Send Notifications
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Download className="text-blue-400" size={20} />
                  Export Data
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Share2 className="text-blue-400" size={20} />
                  Share Event
                </button>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <BarChart2 className="text-blue-400" />
                Ticket Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Available', value: event.available_tickets },
                        { name: 'Sold', value: event.total_tickets - event.available_tickets }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ticketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }} />
                    <span className="text-gray-300">Available Tickets</span>
                  </div>
                  <span className="text-white font-medium">{event.available_tickets}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }} />
                    <span className="text-gray-300">Sold Tickets</span>
                  </div>
                  <span className="text-white font-medium">
                    {event.total_tickets - event.available_tickets}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGalleryModal && <GalleryModal />}
    </div>
  );
};

export default SingleEvent;

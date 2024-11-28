import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Image, Tag, DollarSign, Users, FileText, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { baseUrl } from '../../../api/baseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
    date: '',
    time: '', 
    category: '',
    ticket_price: '',
    total_tickets: '',
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    'Concert',
    'Music',
    'Technology',
    'Food',
    'Sports',
    'Art',
    'Business',
    'Education'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://image-to-public-url.vercel.app/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      setEventData(prev => ({ ...prev, image: data }));
      setSelectedImage(URL.createObjectURL(file));
      toast.success('Image uploaded successfully!');
      setShowImageModal(false);
    } catch (error) {
      toast.error('Error uploading image');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast.error('Please login first');
        return;
      }

      const response = await axios.post(`${baseUrl}/organizer/create-event`, eventData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Event created successfully!', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: 'white',
          },
          icon: '🎉'
        });
        
        // Delay navigation slightly to show success message
        setTimeout(() => {
          navigate('/organizer/my-events');
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error(error.response?.data?.message || 'Error adding event', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: 'white',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
      transition: { duration: 0.2 }
    }
  };

  const formGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (

    <>
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">

      <div className="max-w-6xl mx-auto ">
        <form onSubmit={handleSubmit} className="space-y-12">
          <motion.div 
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="group space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                <FileText className="mr-3 h-5 w-5 text-purple-400" />
                Event Title
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500 shadow-lg"
                placeholder="Give your event a catchy title"
                required
              />
            </div>

            <div className="group space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                <MapPin className="mr-3 h-5 w-5 text-purple-400" />
                Location
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500 shadow-lg"
                placeholder="Where is your event happening?"
                required
              />
            </div>
          </motion.div>

          <motion.div 
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
            className="group space-y-3"
          >
            <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
              <Image className="mr-3 h-5 w-5 text-purple-400" />
              Event Image
            </label>
            <div 
              onClick={() => setShowImageModal(true)}
              className="w-full h-48 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500 transition-all duration-300"
            >
              {selectedImage ? (
                <div className="relative h-full w-full group">
                  <img src={selectedImage} alt="Event" className="h-full w-full object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-75" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowImageModal(true);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-400">Click to upload event image</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
            className="group space-y-3"
          >
            <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
              <FileText className="mr-3 h-5 w-5 text-purple-400" />
              Description
            </label>
            <motion.textarea
              variants={inputVariants}
              whileFocus="focus"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 min-h-[150px] placeholder-gray-500 shadow-lg"
              placeholder="Tell people what makes your event special..."
              required
            ></motion.textarea>
          </motion.div>

          <motion.div 
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <div className="group space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                <Calendar className="mr-3 h-5 w-5 text-purple-400" />
                Date
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-lg"
                required
              />
            </div>

            <div className="group space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                <Clock className="mr-3 h-5 w-5 text-purple-400" />
                Time
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-lg"
                required
              />
            </div>

            <div className="group space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                <Tag className="mr-3 h-5 w-5 text-purple-400" />
                Category
              </label>
              <motion.select
                variants={inputVariants}
                whileFocus="focus"
                name="category"
                value={eventData.category}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500 shadow-lg"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </motion.select>
            </div>
          </motion.div>

          <motion.div 
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="group space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                <DollarSign className="mr-3 h-5 w-5 text-purple-400" />
                Ticket Price
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="number"
                name="ticket_price"
                value={eventData.ticket_price}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500 shadow-lg"
                placeholder="Set your ticket price"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="group space-y-3">
              <label className="flex items-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                <Users className="mr-3 h-5 w-5 text-purple-400" />
                Total Tickets
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="number"
                name="total_tickets"
                value={eventData.total_tickets}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg px-5 py-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500 shadow-lg"
                placeholder="How many tickets are available?"
                min="1"
                required
              />
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-[2px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70"
          >
            <div className="relative bg-[#0A0F1C] px-8 py-4 rounded-[6px] group-hover:bg-opacity-0 transition-all duration-300">
              <span className="flex items-center justify-center text-xl font-bold">
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-6 w-6" />
                    Create Magical Event
                  </>
                )}
              </span>
            </div>
          </motion.button>
        </form>
      </div>

      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Upload Event Image</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowImageModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-all duration-200 cursor-pointer"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </div>
              {uploading && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  <p className="mt-2 text-sm text-gray-400">Uploading your magical image...</p>
                </div>
              )}
              {!uploading && selectedImage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <img src={selectedImage} alt="Uploaded Event" className="w-full h-48 object-cover rounded-lg shadow-lg" />
                  <p className="mt-2 text-sm text-green-400 text-center">Image uploaded successfully!</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default AddEvent;

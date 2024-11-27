import React from 'react'
import { Calendar, Clock, MapPin, Users, DollarSign, Tag, BarChart2, Ticket, Star, Globe, Music, Camera, Film, TrendingUp, Activity, Award, Heart, Share2, Zap, Sparkles, Gift, QrCode, Timer, DoorOpen, PieChart, LineChart, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function OrganizerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center gap-4 mb-6">
            <Sparkles className="text-blue-400 animate-pulse" size={40} />
            <Star className="text-purple-400 animate-bounce" size={40} />
            <Gift className="text-pink-400 animate-pulse" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6 animate-text">Your Event Command Center</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Comprehensive event management and analytics to help you create extraordinary experiences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/organizer/add-event')}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 cursor-pointer"
          >
            <div className="bg-emerald-500/10 p-3 rounded-xl w-fit mb-6">
              <Calendar className="text-emerald-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Create Events</h3>
            <p className="text-gray-300 leading-relaxed">Design and launch stunning events with our intuitive event creation tools.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/organizer/my-events')}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 cursor-pointer"
          >
            <div className="bg-blue-500/10 p-3 rounded-xl w-fit mb-6">
              <Ticket className="text-blue-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Manage Events</h3>
            <p className="text-gray-300 leading-relaxed">View and manage all your events in one place with detailed insights.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/organizer/analytics')}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 cursor-pointer"
          >
            <div className="bg-purple-500/10 p-3 rounded-xl w-fit mb-6">
              <BarChart2 className="text-purple-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Analytics Hub</h3>
            <p className="text-gray-300 leading-relaxed">Comprehensive analytics and insights across all your events.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300"
          >
            <div className="bg-pink-500/10 p-3 rounded-xl w-fit mb-6">
              <LineChart className="text-pink-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Performance Metrics</h3>
            <p className="text-gray-300 leading-relaxed">Track ticket sales, revenue, and attendance trends in real-time.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300"
          >
            <div className="bg-yellow-500/10 p-3 rounded-xl w-fit mb-6">
              <QrCode className="text-yellow-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">QR Code Entry System</h3>
            <p className="text-gray-300 leading-relaxed">Real-time QR code scanning for seamless event check-ins and entry management.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300"
          >
            <div className="bg-red-500/10 p-3 rounded-xl w-fit mb-6">
              <TrendingUp className="text-red-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Growth Analytics</h3>
            <p className="text-gray-300 leading-relaxed">Monitor event performance and identify growth opportunities.</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center space-y-4"
        >
          <button
            onClick={() => navigate('/organizer/add-event')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Create New Event
          </button>
          <button
            onClick={() => navigate('/organizer/analytics')}
            className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ml-4"
          >
            View Analytics
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

import React from "react";
import {
  Calendar,
  Users,
  Ticket,
  Star,
  ArrowRight,
  Gift,
  Music,
  Map,
  Camera,
  Video,
  Heart,
  Trophy,
  Zap,
  Sparkles,
  MessageCircle,
  Share2,
  Clock,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../api/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";

const GetStarted = () => {
    const navigate = useNavigate();
    let toastTriggered = false; // Flag to prevent duplicate toasts
  
    useEffect(() => {
      checkUser();
    }, []);
  
    const checkUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;
  
        const response = await axios.get(`${baseUrl}/checkUser`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (response.data.success && !toastTriggered) {
          toastTriggered = true; // Prevent duplicate toasts
          const { role } = response.data.data;
          toast.success("Welcome back!", {
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          });
  
          setTimeout(() => {
            if (role === "organizer") {
              navigate("/organizer/dashboard");
            } else if (role === "user") {
              navigate("/user/dashboard");
            }
          }, 2000); // 2000ms = 2 seconds
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 flex space-x-8 opacity-20">
            <Music className="w-8 h-8 text-purple-400 animate-bounce" />
            <Camera className="w-8 h-8 text-blue-400 animate-pulse" />
            <Video className="w-8 h-8 text-green-400 animate-bounce delay-100" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-transparent  py-5 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6 ">
            AlgoMax Event Management System
          </h1>
          <p className="text-xl text-gray-400">
            Your one-stop solution for seamless event management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Organizer Section */}

          {/* User Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-purple-500/50 shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Ticket className="w-12 h-12 text-purple-400" />
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Explore & Book Events</h2>
            <p className="text-gray-400 mb-6">
              Discover amazing events and book your tickets seamlessly
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/user/register")}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg inline-flex items-center group"
            >
              Browse Events
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20"
            onClick={() => navigate("/organizer/login")}
          >
            <div className="flex items-center space-x-4 mb-6">
              <Calendar className="w-12 h-12 text-blue-400" />
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Organize Events</h2>
            <p className="text-gray-400 mb-6">
              Create and manage your events with powerful tools and analytics
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center group"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <Zap className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Instant booking confirmations and real-time updates
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <MessageCircle className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Live Chat Support</h3>
            <p className="text-gray-400">
              24/7 customer support for all your queries
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
            <Share2 className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Social Integration</h3>
            <p className="text-gray-400">
              Share and promote events across platforms
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center space-x-6 mb-8">
            <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
            <Users className="w-8 h-8 text-blue-400 animate-pulse delay-100" />
            <Calendar className="w-8 h-8 text-purple-400 animate-pulse delay-200" />
            <Clock className="w-8 h-8 text-green-400 animate-pulse delay-300" />
            <DollarSign className="w-8 h-8 text-pink-400 animate-pulse delay-400" />
          </div>
          <p className="text-xl text-gray-400">
            Join thousands of successful event organizers and attendees
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Trusted by over 10,000+ users worldwide
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;

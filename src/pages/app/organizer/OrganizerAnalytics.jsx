import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../api/baseUrl'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Calendar, Clock, MapPin, Users, DollarSign, Tag, BarChart2, Ticket, Star, Globe, Music, Camera, Film, TrendingUp, Activity, Award, Heart, Share2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrganizerAnalytics() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({
      totalEvents: 0,
      totalTickets: 0,
      totalRevenue: 0,
      uniqueVenues: 0,
      ticketsSold: 0,
      categories: {},
      monthlyRevenue: {},
      popularityScore: 0,
      engagementRate: 0,
      topPerformingEvents: [],
      revenueGrowth: 0,
      averageTicketPrice: 0
    });

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
                const eventData = response.data.data;
                setEvents(eventData);
                calculateAnalytics(eventData);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching events');
        } finally {
            setLoading(false);
        }
    };

    const calculateAnalytics = (eventData) => {
        const analytics = {
            totalEvents: eventData.length,
            totalTickets: 0,
            totalRevenue: 0,
            uniqueVenues: new Set(),
            ticketsSold: 0,
            categories: {},
            monthlyRevenue: {},
            popularityScore: 0,
            engagementRate: 0,
            topPerformingEvents: [],
            revenueGrowth: 0,
            averageTicketPrice: 0
        };

        let totalTicketPrice = 0;

        eventData.forEach(event => {
            // Basic metrics
            analytics.totalTickets += event.total_tickets;
            const eventRevenue = parseFloat(event.ticket_price) * (event.total_tickets - event.available_tickets);
            analytics.totalRevenue += eventRevenue;
            analytics.uniqueVenues.add(event.location);
            analytics.ticketsSold += (event.total_tickets - event.available_tickets);
            
            // Categories
            analytics.categories[event.category] = (analytics.categories[event.category] || 0) + 1;
            
            // Monthly revenue
            const eventMonth = new Date(event.date).toLocaleString('default', { month: 'long' });
            analytics.monthlyRevenue[eventMonth] = (analytics.monthlyRevenue[eventMonth] || 0) + eventRevenue;

            // Calculate ticket price metrics
            totalTicketPrice += parseFloat(event.ticket_price);

            // Top performing events
            analytics.topPerformingEvents.push({
                title: event.title,
                revenue: eventRevenue,
                soldTickets: event.total_tickets - event.available_tickets,
                popularity: ((event.total_tickets - event.available_tickets) / event.total_tickets) * 100
            });
        });

        // Sort top performing events
        analytics.topPerformingEvents.sort((a, b) => b.revenue - a.revenue);
        analytics.topPerformingEvents = analytics.topPerformingEvents.slice(0, 5);

        // Calculate average ticket price
        analytics.averageTicketPrice = totalTicketPrice / eventData.length;

        // Calculate engagement rate
        analytics.engagementRate = (analytics.ticketsSold / analytics.totalTickets) * 100;

        setAnalytics({
            ...analytics,
            uniqueVenues: analytics.uniqueVenues.size
        });
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

    const categoryData = Object.entries(analytics.categories).map(([name, value]) => ({
        name,
        value
    }));

    const monthlyRevenueData = Object.entries(analytics.monthlyRevenue).map(([month, revenue]) => ({
        month,
        revenue
    }));

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
            >
                <BarChart2 className="text-blue-400" />
                Analytics Dashboard
            </motion.h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Calendar className="text-blue-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm">Total Events</h3>
                            <p className="text-2xl font-bold text-white">{analytics.totalEvents}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-xl">
                            <Ticket className="text-green-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm">Tickets Sold</h3>
                            <p className="text-2xl font-bold text-white">{analytics.ticketsSold}</p>
                            <p className="text-sm text-green-400">
                                {analytics.engagementRate.toFixed(1)}% Engagement Rate
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 rounded-xl">
                            <DollarSign className="text-yellow-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm">Total Revenue</h3>
                            <p className="text-2xl font-bold text-white">₹{analytics.totalRevenue.toLocaleString()}</p>
                            <p className="text-sm text-yellow-400">
                                Avg. ₹{analytics.averageTicketPrice.toFixed(2)}/ticket
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                            <MapPin className="text-purple-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm">Unique Venues</h3>
                            <p className="text-2xl font-bold text-white">{analytics.uniqueVenues}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm"
                >
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Tag className="text-blue-400" />
                        Event Categories Distribution
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm"
                >
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="text-blue-400" />
                        Monthly Revenue Trend
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyRevenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Top Performing Events */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm mb-8"
            >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Award className="text-blue-400" />
                    Top Performing Events
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analytics.topPerformingEvents.map((event, index) => (
                        <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                            <h4 className="font-semibold text-white mb-2">{event.title}</h4>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <DollarSign size={14} className="text-green-400" />
                                    Revenue: ₹{event.revenue.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <Ticket size={14} className="text-blue-400" />
                                    Tickets Sold: {event.soldTickets}
                                </p>
                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <Activity size={14} className="text-purple-400" />
                                    Popularity: {event.popularity.toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Ticket Sales Overview */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Users className="text-blue-400" />
                    Detailed Ticket Sales Overview
                </h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={events}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="title" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Bar dataKey="total_tickets" name="Total Tickets" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="available_tickets" name="Available Tickets" fill="#10B981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="sold_tickets" name="Sold Tickets" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}

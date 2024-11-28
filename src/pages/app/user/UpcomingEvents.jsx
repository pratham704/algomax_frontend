import React from 'react'
import { Calendar, MapPin, Clock, Users, Tag, Star } from 'lucide-react'

export default function UpcomingEvents() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Silicon Valley Convention Center",
      price: "$299",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      attendees: 2500,
      rating: 4.8
    },
    {
      id: 2, 
      title: "Summer Music Festival",
      date: "June 21, 2024",
      time: "12:00 PM - 11:00 PM",
      location: "Central Park Amphitheater",
      price: "$149",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop",
      attendees: 5000,
      rating: 4.9
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "April 8, 2024", 
      time: "11:00 AM - 8:00 PM",
      location: "Metropolitan Food Hall",
      price: "$89",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
      attendees: 1200,
      rating: 4.7
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Upcoming Events</h1>
          <div className="flex gap-4">
            <select className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700">
              <option>All Categories</option>
              <option>Tech</option>
              <option>Music</option>
              <option>Food</option>
            </select>
            <select className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700">
              <option>Sort by Date</option>
              <option>Sort by Price</option>
              <option>Sort by Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map(event => (
            <div key={event.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
              <img 
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                    {event.date}
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-3 text-blue-500" />
                    {event.time}
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                    {event.location}
                  </div>

                  <div className="flex items-center text-gray-300">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    {event.attendees.toLocaleString()} attendees
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-300">
                      <Tag className="w-5 h-5 mr-3 text-blue-500" />
                      {event.price}
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 mr-1" />
                      {event.rating}
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

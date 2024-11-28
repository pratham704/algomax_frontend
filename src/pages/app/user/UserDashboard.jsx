import React from 'react'
import { Ticket, QrCode, Settings, Calendar, CreditCard, MapPin, Compass, Globe2, Music, PartyPopper } from 'lucide-react'

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-neutral-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-gray-400 mt-2">Discover amazing events in your city</p>
          </div>
          <div className="flex items-center space-x-4">
            <Globe2 className="h-5 w-5 text-teal-400" />
            <select className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500">
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard 
            icon={<Compass className="w-8 h-8 text-teal-400" />}
            title="Explore Events"
            description="Discover trending events in your city"
            gradient="from-teal-500 to-emerald-500"
          />
          
          <DashboardCard
            icon={<Ticket className="w-8 h-8 text-purple-400" />}
            title="My Tickets"
            description="View and manage your event tickets"
            gradient="from-purple-500 to-pink-500"
          />

          <DashboardCard
            icon={<Music className="w-8 h-8 text-blue-400" />}
            title="Live Events"
            description="Join exciting live events happening now"
            gradient="from-blue-500 to-indigo-500"
          />

          <DashboardCard
            icon={<MapPin className="w-8 h-8 text-red-400" />}
            title="Nearby Events"
            description="Find events happening around you"
            gradient="from-red-500 to-orange-500"
          />

          <DashboardCard
            icon={<PartyPopper className="w-8 h-8 text-yellow-400" />}
            title="Featured Events"
            description="Don't miss out on popular events"
            gradient="from-yellow-500 to-amber-500"
          />

          <DashboardCard
            icon={<CreditCard className="w-8 h-8 text-pink-400" />}
            title="Quick Pay"
            description="Fast and secure ticket payments"
            gradient="from-pink-500 to-rose-500"
          />
        </div>
      </div>
    </div>
  )
}

const DashboardCard = ({ icon, title, description, gradient }) => {
  return (
    <div className="relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-300">{description}</p>
        <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
      </div>
    </div>
  )
}

export default UserDashboard

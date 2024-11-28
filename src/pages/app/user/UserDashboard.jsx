import React from 'react'
import { 
  Ticket, QrCode, Settings, Calendar, CreditCard, MapPin, Compass, Globe2, Music, 
  PartyPopper, Bell, Star, Heart, Users, TrendingUp, Clock, Zap, Gift, Award,
  Sparkles, Coffee, Mic, Camera, Film, Palette
} from 'lucide-react'

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-neutral-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Welcome Back
              </h1>
            </div>
            <p className="text-gray-400 mt-3 text-lg flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-teal-400" />
              Discover amazing events in your city
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-teal-400 hover:text-teal-300 cursor-pointer transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-800/80 rounded-lg px-4 py-2.5 border border-gray-700">
              <MapPin className="h-5 w-5 text-teal-400" />
              <select className="bg-transparent text-gray-100 outline-none cursor-pointer">
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <QuickStat icon={<Ticket className="h-6 w-6" />} label="Tickets Bought" value="12" />
          <QuickStat icon={<Calendar className="h-6 w-6" />} label="Upcoming Events" value="5" />
          <QuickStat icon={<Heart className="h-6 w-6" />} label="Wishlisted" value="8" />
          <QuickStat icon={<Star className="h-6 w-6" />} label="Reviews Given" value="15" />
        </div> */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard 
            icon={<Compass className="w-8 h-8 text-teal-400" />}
            title="Explore Events"
            description="Discover trending events in your city"
            gradient="from-teal-500 to-emerald-500"
            badge="New"
          />
          
          <DashboardCard
            icon={<Ticket className="w-8 h-8 text-purple-400" />}
            title="My Tickets"
            description="View and manage your event tickets"
            gradient="from-purple-500 to-pink-500"
            badge=" Active"
          />

          <DashboardCard
            icon={<Music className="w-8 h-8 text-blue-400" />}
            title="Live Events"
            description="Join exciting live events happening now"
            gradient="from-blue-500 to-indigo-500"
            badge="Live"
          />

          <DashboardCard
            icon={<Film className="w-8 h-8 text-red-400" />}
            title="Movie Screenings"
            description="Book tickets for latest movies"
            gradient="from-red-500 to-orange-500"
          />

          <DashboardCard
            icon={<Mic className="w-8 h-8 text-yellow-400" />}
            title="Comedy Shows"
            description="Laugh out loud with stand-up comedy"
            gradient="from-yellow-500 to-amber-500"
          />

          <DashboardCard
            icon={<Palette className="w-8 h-8 text-pink-400" />}
            title="Art Exhibitions"
            description="Explore creative art galleries"
            gradient="from-pink-500 to-rose-500"
          />

          <DashboardCard
            icon={<Coffee className="w-8 h-8 text-amber-400" />}
            title="Food Festivals"
            description="Discover culinary experiences"
            gradient="from-amber-500 to-orange-500"
          />

          <DashboardCard
            icon={<Users className="w-8 h-8 text-indigo-400" />}
            title="Networking Events"
            description="Connect with like-minded people"
            gradient="from-indigo-500 to-violet-500"
          />

          <DashboardCard
            icon={<Award className="w-8 h-8 text-emerald-400" />}
            title="Sports Events"
            description="Watch live sports matches"
            gradient="from-emerald-500 to-green-500"
          />
        </div>
      </div>
    </div>
  )
}

const QuickStat = ({ icon, label, value }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-700/50 rounded-lg text-teal-400">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  )
}

const DashboardCard = ({ icon, title, description, gradient, badge }) => {
  return (
    <div className="relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-700/50 rounded-lg">
              {icon}
            </div>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          {badge && (
            <span className="px-2 py-1 text-xs font-semibold bg-teal-500/20 text-teal-400 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-gray-300">{description}</p>
        <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
      </div>
    </div>
  )
}

export default UserDashboard

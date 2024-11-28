import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../api/baseUrl'
import { Ticket, Calendar, Users, Loader, AlertCircle, Clock, ArrowRight, Tag, CreditCard, QrCode, X } from 'lucide-react'

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/payment/my-tickets`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setTickets(response.data.data.bookings);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const openQRModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowQR(true);
  };

  if(loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <Loader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  if(error) return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="flex items-center text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Error fetching tickets</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
        <Ticket className="w-8 h-8 mr-3 text-blue-500" />
        My Bookings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets && tickets.map((ticket) => (
          <div key={ticket.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Tag className="w-5 h-5 text-emerald-400 mr-2" />
                <span className="text-emerald-400 font-semibold">Confirmed Booking</span>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 mr-3 text-blue-400" />
                <span className="font-medium">{ticket.tickets_booked} {ticket.tickets_booked === 1 ? 'Ticket' : 'Tickets'}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-3 text-purple-400" />
                <span className="font-medium">{new Date(ticket.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 mr-3 text-pink-400" />
                <span className="font-medium">{new Date(ticket.created_at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <CreditCard className="w-5 h-5 mr-3 text-yellow-400" />
                <span className="font-medium">Payment Completed</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate(`/user/booked/${ticket.event_id}`)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center font-medium"
              >
                View Details
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button
                onClick={() => openQRModal(ticket)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center font-medium"
              >
                Entry Pass
                <QrCode className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Entry Pass</h3>
              <button 
                onClick={() => setShowQR(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-xl">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-${selectedTicket?.id}`}
                alt="QR Code"
                className="w-full h-auto"
              />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-300 mb-2">Scan this QR code at the venue</p>
              <p className="text-sm text-gray-400">Valid for {selectedTicket?.tickets_booked} {selectedTicket?.tickets_booked === 1 ? 'person' : 'people'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyTickets

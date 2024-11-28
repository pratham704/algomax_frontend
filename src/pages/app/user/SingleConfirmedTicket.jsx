import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Loader, AlertCircle, Calendar, MapPin, Clock, Ticket, Users, Tag, CreditCard } from 'lucide-react'
import { baseUrl } from '../../../api/baseUrl'
import { useState, useEffect } from 'react'

const SingleConfirmedTicket = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    getTicketData();
  }, []);

  const getTicketData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/payment/my-ticket-with-single-event-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setTicketData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <Loader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="flex items-center text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>Error fetching ticket details</span>
      </div>
    </div>
  );

  if (!ticketData) return null;

  const event = ticketData.eventDetails[0];
  const booking = ticketData.bookings[0];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Ticket className="w-8 h-8 mr-3 text-blue-500" />
              Ticket Details
            </h1>
            <span className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium">
              Confirmed
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-64 object-cover rounded-xl"
              />
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                <p className="text-gray-400">{event.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-purple-400" />
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-3 text-pink-400" />
                  <span className="font-medium">{event.time}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                  <span className="font-medium">{event.location}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Tag className="w-5 h-5 mr-3 text-emerald-400" />
                  <span className="font-medium">{event.category}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="font-medium">
                    {booking.tickets_booked} {booking.tickets_booked === 1 ? 'Ticket' : 'Tickets'} Booked
                  </span>
                </div>

                <div className="flex items-center text-gray-300">
                  <CreditCard className="w-5 h-5 mr-3 text-indigo-400" />
                  <span className="font-medium">
                    Total Amount: ₹{Number(event.ticket_price) * booking.tickets_booked}
                  </span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-blue-400 text-sm">
                  Booking ID: {booking.id}
                </p>
                <p className="text-blue-400 text-sm mt-1">
                  Booked on: {new Date(booking.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleConfirmedTicket

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../../api/baseUrl';
import axios from 'axios';
import { Calendar, Clock, MapPin, Ticket, Music, Tag, DollarSign, Lock, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { load } from '@cashfreepayments/cashfree-js';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [showSimulate, setShowSimulate] = useState(false);
    const [cashfree, setCashfree] = useState(null);

    useEffect(() => {
        fetchEvent();
        initializeSDK();
    }, []);

    const initializeSDK = async () => {
        try {
            const cashfreeInstance = await load({
                mode: 'sandbox'
            });
            setCashfree(cashfreeInstance);
        } catch (error) {
            alert('Error initializing Cashfree SDK');
            console.error('Error initializing Cashfree SDK:', error);
        }
    };

    const fetchEvent = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/user/get-event-by-id/${id}`, config);
            setEvent(data.data[0]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const getSessionId = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/payment/create-order/${tickets * parseFloat(event.ticket_price)}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.data.data?.payment_session_id) {
                setOrderId(response.data.order_id);
                setSessionId(response.data.data.payment_session_id);
                return response.data.data.payment_session_id;
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handlePayment = async () => {
        try {
            if (!cashfree) {
                toast.error('Payment system not initialized. Please try again.');
                return;
            }

            setProcessing(true);
            const sessionId = await getSessionId();
            
            if (!sessionId) {
                toast.error('Could not create payment session');
                return;
            }

            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: '_modal',
                onSuccess: (response) => {
                  console.log('Payment successful:', response);
                  alert('Payment successful');
                },
                onCancel: () => {
                    alert('Payment was cancelled');
                  toast.error('Payment was cancelled');
                },
                onError: (error) => {
                    alert('Payment failed');
                  console.error('Payment error:', error);
                  toast.error('Payment failed. Please try again.');
                },
            };

            setShowSimulate(true);
        
            await cashfree.checkout(checkoutOptions);
        } catch (error) {
            console.error(error);
            toast.error('Payment initialization failed');
        } finally {
            setProcessing(false);
        }
    }

    const simulateSuccess = async () => {
        try {
            setProcessing(true);
            const token = localStorage.getItem('accessToken');
            const payload = {
                organizer_id: event.organizer_id,
                event_id: event.id,
                number_of_tickets: tickets,
                amount: tickets * parseFloat(event.ticket_price)
            };
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(`${baseUrl}/user/payment/book-event`, payload, config);
            if (response.status === 200 || response.status === 201) {
                setBookingSuccess(true);
                toast.success('Tickets booked successfully!');
                navigate('/user/my-tickets');
            }
        } catch (error) {
            console.error(error);
            toast.error('Booking failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-700/50"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <motion.img 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300" 
                        />
                        <div className="space-y-4 mt-6">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">{event.title}</h2>
                            <div className="flex items-center text-gray-300">
                                <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Ticket className="w-5 h-5 mr-2 text-purple-500" />
                                <span>Available Seats: {event.available_tickets}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600/50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-300">Price per ticket</span>
                                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">₹{event.ticket_price}</span>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-gray-300">Number of tickets</span>
                                <div className="flex items-center space-x-4">
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setTickets(Math.max(1, tickets - 1))}
                                        className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition-colors"
                                    >-</motion.button>
                                    <span className="font-semibold text-lg">{tickets}</span>
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setTickets(Math.min(Math.min(10, event.available_tickets), tickets + 1))}
                                        className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg transition-colors"
                                    >+</motion.button>
                                </div>
                            </div>
                            <div className="border-t border-gray-600 pt-4">
                                <div className="flex justify-between items-center text-xl">
                                    <span>Total Amount</span>
                                    <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">₹{(tickets * parseFloat(event.ticket_price)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {event.available_tickets < 10 && (
                            <div className="flex items-center justify-center space-x-2 text-amber-400">
                                <AlertCircle className="w-4 h-4" />
                                <span>Only {event.available_tickets} tickets left!</span>
                            </div>
                        )}

                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                            <Lock className="w-4 h-4" />
                            <span>Secured by Cashfree Payments</span>
                            <Shield className="w-4 h-4" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePayment}
                            disabled={processing || bookingSuccess}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 transition-all duration-300"
                        >
                            {processing ? 'Processing...' : bookingSuccess ? 'Booking Confirmed! ✨' : 'Make Payment'}
                        </motion.button>

                        {showSimulate && !bookingSuccess && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={simulateSuccess}
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 transition-all duration-300 mt-4"
                            >
                                Simulate Payment Success
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Payment

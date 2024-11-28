import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Ticket, Music, Tag, DollarSign, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventModal = ({ event, onClose }) => {
  const navigate = useNavigate();
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-xl p-8 max-w-4xl w-full shadow-2xl border border-gray-700/50"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{event.title}</h2>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X size={24} />
            </motion.button>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <motion.img 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                src={event.image} 
                alt={event.title}
                className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300" 
              />
              
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{event.location}, {event.city}</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </motion.div>
  
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  <Clock className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{event.time}</span>
                </motion.div>
  
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200"
                >
                  <Tag className="w-5 h-5 mr-3 text-purple-500" />
                  <span>{event.category}</span>
                </motion.div>
              </div>
            </div>
  
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">About Event</h3>
                <p className="text-gray-300 leading-relaxed">{event.description}</p>
              </motion.div>
  
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl space-y-4 border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="text-gray-300">
                    <DollarSign className="w-5 h-5 inline mr-2 text-purple-500" />
                    Ticket Price
                  </div>
                  <div className="text-white font-semibold">₹{event.ticket_price}</div>
                </div>
  
                <div className="flex justify-between items-center">
                  <div className="text-gray-300">
                    <Ticket className="w-5 h-5 inline mr-2 text-purple-500" />
                    Available Tickets
                  </div>
                  <div className="text-white font-semibold">{event.available_tickets}</div>
                </div>
              </motion.div>
  
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl transition duration-300 shadow-lg hover:shadow-purple-500/25"
                onClick={() => navigate(`/user/payment/${event.id}`)}
              >
                Book Tickets
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
export default EventModal;
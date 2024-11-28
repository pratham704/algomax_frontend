import React, { useState } from 'react';
import { Calendar, Globe2, UserPlus, Sparkles, PartyPopper, Music, Ticket, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { baseUrl } from '../../../../api/baseUrl';

const RegisterUser = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      
      const { uid, displayName, email } = result.user;

      const userData = {
        firebaseUid: uid,
        name: displayName,
        email: email,
        role: "user"
      };

      // Send to backend
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful!', {
          style: {
            background: '#333',
            color: '#fff',
          }
        });
        localStorage.setItem('accessToken', data.data.token);
        nav('/user/dashboard');
      } else {
        if (response.status === 400) {
          toast.error('Account already exists. Please login instead.', {
            style: {
              background: '#333',
              color: '#fff',
            }
          });
          nav('/user/login');
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      }

    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign up cancelled', {
          style: {
            background: '#333',
            color: '#fff',
          }
        });
      } else if (error.code === 'auth/network-request-failed') {
        toast.error('Network error. Please check your connection', {
          style: {
            background: '#333',
            color: '#fff',
          }
        });
      } else {
        toast.error('Registration failed. Please try again', {
          style: {
            background: '#333',
            color: '#fff',
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-neutral-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-800 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-900 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-900 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />

      <div className="relative max-w-4xl w-full space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Features Section */}
          <div className="space-y-6 p-8 bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/30">
            <h2 className="text-3xl font-bold text-gray-100">Join the Experience</h2>
            <div className="space-y-4">
              {[
                { icon: Ticket, color: 'text-teal-400', text: 'Access exclusive events' },
                { icon: Music, color: 'text-purple-400', text: 'Discover amazing performances' },
                { icon: Heart, color: 'text-red-400', text: 'Connect with fellow event-goers' },
                { icon: Star, color: 'text-yellow-400', text: 'Early access to ticket sales' }
              ].map(({ icon: Icon, color, text }, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300">
                  <Icon className={`h-6 w-6 ${color}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="relative bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/30">
            {/* Logo & Header */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-teal-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-teal-600 to-indigo-700 p-4 rounded-2xl shadow-lg transform hover:rotate-12 transition-transform duration-300">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-8 w-8 text-white" />
                      <PartyPopper className="h-6 w-6 text-white animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-100">
                  Join EventHub
                </h1>
                <div className="flex items-center justify-center space-x-2">
                  <Globe2 className="h-4 w-4 text-teal-300" />
                  <p className="text-teal-300 text-sm">
                    Discover Amazing Events
                  </p>
                </div>
              </div>
            </div>

            {/* Sign In and Register Buttons */}
            <div className="mt-10 space-y-4">
              <button
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="group relative w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading ? (
                  <ThreeDots color="#2DD4BF" height={25} width={25} />
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Sign up with Google</span>
                    <Sparkles className="h-5 w-5 text-teal-500 animate-pulse" />
                  </>
                )}
              </button>

              <button
                onClick={() => nav('/user/login')}
                disabled={loading}
                className="group relative w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-teal-600 to-indigo-700 hover:from-teal-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <UserPlus className="h-5 w-5" />
                <span>Already have an account? Login</span>
              </button>
            </div>

            {/* Footer Links */}
            <div className="text-center text-gray-400 text-xs mt-8">
              <p className="mb-2">By continuing, you agree to our</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="hover:text-gray-100 transition-colors">Terms of Service</a>
                <span>&bull;</span>
                <a href="#" className="hover:text-gray-100 transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
import React, { useState } from 'react';
import { Calendar, Globe2, UserPlus, Shield, LucideShieldCheck, AlertCircle, Sparkles, PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { baseUrl } from '../../../../api/baseUrl';

const LoginOrganizer = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      
      const { uid, email } = result.user;

      const userData = {
        firebaseUid: uid,
        email: email,
        role: "organizer"
      };

      // Send to backend
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        localStorage.setItem('accessToken', data.data.token);
        nav('/organizer/dashboard');
      } else {
        if (response.status === 404) {
          toast.error('Account not found. Please register first.');
          nav('/organizer/register');
        } else {
          throw new Error(data.message || 'Login failed');
        }
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign in cancelled');
      } else if (error.code === 'auth/network-request-failed') {
        toast.error('Network error. Please check your connection');
      } else {
        toast.error('Login failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        <div className="relative bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
          {/* Logo & Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg transform hover:rotate-12 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-8 w-8 text-white" />
                    <PartyPopper className="h-6 w-6 text-white animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Welcome Back Organizer
              </h1>
              <div className="flex items-center justify-center space-x-2">
                <Globe2 className="h-4 w-4 text-gray-400" />
                <p className="text-gray-400 text-sm">
                  Create & Manage Amazing Events
                </p>
              </div>
            </div>
          </div>

          {/* Sign In and Register Buttons */}
          <div className="mt-10 space-y-4">
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {loading ? (
                <ThreeDots color="#4F46E5" height={25} width={25} />
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
                  <span>Sign in with Google</span>
                  <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
                </>
              )}
            </button>

            {/* Register Button */}
            <button
              onClick={() => nav('/organizer/register')}
              disabled={loading}
              className="group relative w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <UserPlus className="h-5 w-5" />
              <span>Create New Account</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-700/30 rounded-xl border border-gray-700/50 hover:bg-gray-700/40 transition-colors">
              <Shield className="h-6 w-6 text-pink-400" />
              <span className="text-gray-400 text-xs text-center">SSL Secure</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-700/30 rounded-xl border border-gray-700/50 hover:bg-gray-700/40 transition-colors">
              <LucideShieldCheck className="h-6 w-6 text-purple-400" />
              <span className="text-gray-400 text-xs text-center">Verified</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-700/30 rounded-xl border border-gray-700/50 hover:bg-gray-700/40 transition-colors">
              <AlertCircle className="h-6 w-6 text-blue-400" />
              <span className="text-gray-400 text-xs text-center">24/7 Support</span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center text-gray-400 text-xs mt-8">
            <p className="mb-2">By continuing, you agree to our</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOrganizer;

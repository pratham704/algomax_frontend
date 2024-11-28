import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe2, 
  UserPlus, 
  LogIn, 
  Sparkles, 
  ShieldCheck, 
  Rocket, 
  Lock, 
  CheckCircle2 
} from 'lucide-react';
import { auth, provider } from '../../../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { baseUrl } from '../../../../api/baseUrl';

export default function LoginUser() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      
      const { uid, email, displayName, photoURL } = result.user;

      const userData = {
        firebaseUid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL
      };

      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!', {
          style: {
            background: '#333',
            color: '#fff',
          }
        });
        localStorage.setItem('accessToken', data.data.token);
        localStorage.setItem('userProfile', JSON.stringify(userData));
        nav('/user/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign in cancelled', {
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
        toast.error('Login failed. Please try again', {
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
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white/10 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-md w-full space-y-8 z-10">
        <div className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/30 relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 opacity-50 pointer-events-none"></div>

          {/* Header */}
          <div className="text-center space-y-6 relative z-10">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-teal-600 to-indigo-700 p-5 rounded-3xl shadow-lg">
                  <LogIn className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600">
                Welcome Back
              </h1>
              <div className="flex items-center justify-center space-x-2">
                <Globe2 className="h-5 w-5 text-teal-300 animate-spin-slow" />
                <p className="text-teal-300 text-md font-medium">
                  Secure Authentication
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 my-8 relative z-10">
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
              <ShieldCheck className="mx-auto h-8 w-8 text-teal-400 mb-2" />
              <p className="text-xs text-gray-300">Secure Login</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
              <Rocket className="mx-auto h-8 w-8 text-indigo-400 mb-2" />
              <p className="text-xs text-gray-300">Quick Access</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
              <Lock className="mx-auto h-8 w-8 text-pink-400 mb-2" />
              <p className="text-xs text-gray-300">Privacy First</p>
            </div>
          </div>

          {/* Google Sign In */}
          <div className="relative z-10">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-4 bg-white/10 hover:bg-white/20 text-gray-100 font-bold py-4 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              {loading ? (
                <ThreeDots color="#2DD4BF" height={25} width={25} />
              ) : (
                <>
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
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
                  <span className="text-lg">Sign in with Google</span>
                  <Sparkles className="h-6 w-6 text-teal-500 animate-pulse" />
                </>
              )}
            </button>
          </div>

          {/* Verification Info */}
          <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-teal-400" />
            <span>Verified & Secure Authentication Method</span>
          </div>

          {/* Footer Links */}
          <div className="text-center text-gray-400 text-xs mt-6 relative z-10">
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => nav('/organizer/register')}
                className="hover:text-gray-100 transition-colors flex items-center bg-gray-800/50 px-3 py-2 rounded-lg"
              >
                <UserPlus className="mr-2 h-4 w-4 text-teal-400" /> 
                Create an Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
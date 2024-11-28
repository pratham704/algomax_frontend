import React, { useState, useEffect } from 'react';
import PublicRoutes from './routes/PublicRoutes';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from './api/baseUrl';
import { useSetRecoilState } from 'recoil';
import { authState } from './atoms/authAtom';
import { Loader2 } from 'lucide-react';

export default function App() {
  const setAuthState = useSetRecoilState(authState);
  const [loading, setLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setAuthState('unauthenticated');
        return;
      }

      const response = await axios.get(`${baseUrl}/checkUser`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        const { role } = response.data.data;
        if (role === "organizer") {
          setAuthState('organizer');
        } else if (role === "user") {
          setAuthState('user');
        }
      } else {
        setAuthState('unauthenticated');
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setAuthState('unauthenticated');
    } finally {
      setLoading(false); // Mark loading as complete
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="relative w-80">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-2xl"></div>
          <div className="relative bg-gray-900/90 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.1)] border border-purple-500/20">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full w-3/4 rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
                <p className="text-sm text-gray-300 font-medium tracking-wide">
                  Authenticating...
                </p>
              </div>

              <div className="w-full space-y-1">
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500/40 to-blue-500/40 animate-progress"></div>
                </div>
                <div className="w-3/4 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 animate-progress delay-150"></div>
                </div>
                <div className="w-1/2 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-progress delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PublicRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

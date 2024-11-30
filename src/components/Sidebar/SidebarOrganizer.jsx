import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Bell,
  Inbox,
  Menu,
  X,
  LogOut,
  UserCircle2,
  PlusCircle,
  BarChart3,
  Settings,
} from "lucide-react";
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";

const menuItems = [
  {
    category: "Main",
    items: [
      {
        id: 1,
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/organizer/dashboard",
      },
      {
        id: 2,
        icon: PlusCircle,
        label: "Add Event",
        path: "/organizer/add-event",
      },    {
        id: 3,
        icon: PlusCircle,
        label: "My events",
        path: "/organizer/my-events",
      },
      {
        id: 4,
        icon: BarChart3,
        label: "Analytics",
        path: "/organizer/analytics",
      },
      {
        id: 5,
        icon: Settings,
        label: "Settings",
        path: "/organizer/settings",
      },
    ],
  },
];

const SidebarOrganizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("accessToken");
      setShowLogoutModal(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleNavigation = (path) => {
    setIsOpen(false); // Close sidebar when navigating
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNotifications = () => {
    alert('Notifications');
  };

  // Logout Confirmation Modal
  const LogoutModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 w-80">
        <h3 className="text-xl font-semibold text-white mb-4">Confirm Logout</h3>
        <p className="text-gray-400 mb-6">Are you sure you want to logout from your account?</p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="h-16 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-3 cursor-pointer" >
            <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-xl">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white text-xl">EventMaster</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications Button */}
            <button 
              onClick={handleNotifications}
              className="p-2 rounded-full hover:bg-gray-800/70 transition-colors text-gray-400 hover:text-white relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-pink-500 rounded-full" />
            </button>

            {/* Messages Button */}
            {/* <button className="p-2 rounded-full hover:bg-gray-800/70 transition-colors text-gray-400 hover:text-white">
              <Inbox className="h-5 w-5" />
            </button> */}

            {/* Sidebar Menu Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-800/70 transition-colors text-gray-400 hover:text-white z-50"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900/95 backdrop-blur-md w-72 transform transition-all duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-pink-600/10" />

          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800/70 transition-colors text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* User Profile */}
          <div className="relative pt-20 px-4 pb-6 border-b border-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="p-1 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500">
                <div className="bg-gray-900 p-1 rounded-full">
                  <UserCircle2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium">Event Organizer</h3>
                <p className="text-sm text-gray-400">Premium Account</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="relative py-4">
            {menuItems.map((section, idx) => (
              <div key={idx} className="px-4 mb-6">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  {section.category}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.path)}
                      className={`group w-full flex items-center justify-between p-2.5 rounded-lg transition-all duration-200
                        ${location.pathname === item.path
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
                          : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon
                          className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110
                          ${location.pathname === item.path ? "text-purple-400" : ""}`}
                        />
                        <span className={location.pathname === item.path ? "font-medium" : ""}>
                          {item.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && <LogoutModal />}
    </>
  );
};

export default SidebarOrganizer;

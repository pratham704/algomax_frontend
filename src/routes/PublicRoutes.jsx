import React from "react";
import GetStarted from "../pages/app/GetStarted/GetStarted";
import NotFound from "../components/NotFound";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllEvents from "../pages/app/ExploreEvents/AllEvents";
import LoginOrganizer from "../pages/app/auth/organizerAuth/LoginOrganizer";
import RegisterOrganizer from "../pages/app/auth/organizerAuth/RegisterOrganizer";
import OrganizerAddEvent from "../pages/app/organizer/AddEvent";
import SidebarOrganizer from "../components/Sidebar/SidebarOrganizer";
import GetMyEvents from "../pages/app/organizer/MyEvents/GetMyEvents";
import SingleEvent from "../pages/app/organizer/MyEvents/SingleEvent";
import OrganizerAnalytics from "../pages/app/organizer/OrganizerAnalytics";
import OrganizerDashboard from "../pages/app/organizer/OrganizerDashboard";

// user routes
// import LoginUser from "../pages/app/auth/userAuth/LoginUser";
import RegisterUser from "../pages/app/auth/userAuth/RegisterUser";
import LoginUser from "../pages/app/auth/userAuth/LoginUser";
import UserDashboard from "../pages/app/user/UserDashboard";
import SidebarUser from "../components/Sidebar/SidebarUser";
import ExploreEvents from "../pages/app/user/ExploreEvents";
import Payment from "../pages/app/user/Payment";
import MyTickets from "../pages/app/user/MyTickets";
import SingleConfirmedTicket from "../pages/app/user/SingleConfirmedTicket";
import UpcomingEvents from "../pages/app/user/UpcomingEvents";
const PublicRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                {/* 
            <SidebarOrganizer /> */}

                <GetStarted />
              </>
            }
          />
          <Route exact path="/user/all-events" element={<AllEvents />} />

          {/* organizer routes */}
          <Route exact path="/organizer/login" element={<LoginOrganizer />} />
          <Route
            exact
            path="/organizer/register"
            element={<RegisterOrganizer />}
          />
          <Route
            exact
            path="/organizer/add-event"
            element={
              <>
                <SidebarOrganizer />
                <OrganizerAddEvent />
              </>
            }
          />

          <Route
            exact
            path="/organizer/my-events"
            element={
              <>
                <SidebarOrganizer />
                <GetMyEvents />
              </>
            }
          />

          <Route
            exact
            path="/organizer/my-events/:id"
            element={
              <>
                <SidebarOrganizer />
                <SingleEvent />
              </>
            }
          />

          <Route
            exact
            path="/organizer/analytics"
            element={
              <>
                <SidebarOrganizer />
                <OrganizerAnalytics />
              </>
            }
          />

          <Route
            exact
            path="/organizer/dashboard"
            element={
              <>
                <SidebarOrganizer />
                <OrganizerDashboard />
              </>
            }
          />

          <Route path="*" element={<NotFound />} />

          {/* user routes */}
          <Route exact path="/user/login" element={<LoginUser />} />
          <Route exact path="/user/register" element={<RegisterUser />} />
          <Route
            exact
            path="/user/dashboard"
            element={
              <>
                <SidebarUser />
                <UserDashboard />
              </>
            }
          />

          <Route
            exact
            path="/user/explore-events"
            element={
              <>
                <SidebarUser />
                <ExploreEvents />
              </>
            }
          />

          <Route
            exact
            path="/user/payment/:id"
            element={
              <>
                <SidebarUser />
                <Payment />
              </>
            }
          />

          <Route exact path="/user/my-tickets" element={<>
                <SidebarUser />
                <MyTickets />
          </>} />

          <Route exact path="/user/booked/:id" element={<>
                <SidebarUser />
                <SingleConfirmedTicket />
          </>} />

          <Route exact path="/user/upcoming" element={<>
                <SidebarUser />
                <UpcomingEvents />
          </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PublicRoutes;

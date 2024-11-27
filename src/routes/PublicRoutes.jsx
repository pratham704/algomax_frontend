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


          <Route exact path="/organizer/dashboard" element={
            <>
            <SidebarOrganizer />
            <OrganizerDashboard />
            </>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PublicRoutes;

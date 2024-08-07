import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Contact from "./components/Contact";
import FreeLancersListLayout from "./components/FreeLancersListLayout";
import JobsListLayout from "./components/JobsListLayout";
import TasksListLayout from "./components/TasksListLayout";
import BrowseCompanies from "./components/BrowseCompanies";
import CompanyDetails from "./components/CompanyDetails";
import TaskDetails from "./components/TaskDetails";
import JobDetails from "./components/JobDetails";
import Blog from "./components/Blog";
import Pricing from "./components/Pricing";
import Checkout from "./components/checkout";
import Invoice from "./components/Invoice";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Login from "./components/login";
import Register from "./components/register";
import { UserProvider } from "./context/userContext";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import FreeLancerDetails from "./components/FreeLancerDetails";
import DashboardSettings from "./components/DashboardSettings";
import DashboardMessages from "./components/DashboardMessages";
import DashboardManageCandidates from "./components/DashboardManageCandidates";
import DashboardManageBidders from "./components/DashboardManageBidders";
import DashboardBookmarks from "./components/DashboardBookmarks";
import DashboardPostTask from "./components/DashboardPostTask";
import DashboardPostJob from "./components/DashboardPostJob";
import OrderConformation from "./components/OrderConfirmation";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/freelancers"
            element={
              <Layout>
                <FreeLancersListLayout />
              </Layout>
            }
          />
          <Route
            path="/jobs"
            element={
              <Layout>
                <JobsListLayout />
              </Layout>
            }
          />
          <Route
            path="/tasks"
            element={
              <Layout>
                <TasksListLayout />
              </Layout>
            }
          />
          <Route
            path="/companies"
            element={
              <Layout>
                <BrowseCompanies />
              </Layout>
            }
          />
          <Route
            path="/company/details"
            element={
              <Layout>
                <CompanyDetails />
              </Layout>
            }
          />
          <Route
            path="/task/details/:id"
            element={
              <Layout>
                <TaskDetails />
              </Layout>
            }
          />
          <Route
            path="/job/details/:id"
            element={
              <Layout>
                <JobDetails />
              </Layout>
            }
          />
          <Route
            path="/contact"
            createError
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/pricing"
            element={
              <Layout>
                <Pricing />
              </Layout>
            }
          />
          <Route
            path="/checkout/:plan"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/freelancer/details/:id"
            element={
              <Layout>
                <FreeLancerDetails />
              </Layout>
            }
          />
          <Route
            path="/dashboard/setting/"
            element={
              <Layout>
                <DashboardSettings />
              </Layout>
            }
          />
          <Route
            path="/dashboard/message/"
            element={
              <Layout>
                <DashboardMessages />
              </Layout>
            }
          />
          <Route
            path="/dashboard/manage/candidate/:id"
            element={
              <Layout>
                <DashboardManageCandidates />
              </Layout>
            }
          />
          <Route
            path="/dashboard/manage/bidders/:id"
            element={
              <Layout>
                <DashboardManageBidders />
              </Layout>
            }
          />
          <Route
            path="/dashboard/bookmarks/"
            element={
              <Layout>
                <DashboardBookmarks />
              </Layout>
            }
          />
          <Route
            path="/dashboard/PostTask/"
            element={
              <Layout>
                <DashboardPostTask />
              </Layout>
            }
          />
          <Route
            path="/dashboard/PostJob/"
            element={
              <Layout>
                <DashboardPostJob />
              </Layout>
            }
          />
          <Route
            path="/Order/Confirmation/"
            element={
              <Layout>
                <OrderConformation />
              </Layout>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </UserProvider>
  );
}

export default App;

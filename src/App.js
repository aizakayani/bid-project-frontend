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
            path="/task/details"
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
            path="/checkout"
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/invoice" element={<Invoice />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </UserProvider>
  );
}

export default App;

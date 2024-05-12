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

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/freelancers"
                  element={<FreeLancersListLayout />}
                />
                <Route path="/jobs" element={<JobsListLayout />} />
                <Route path="/tasks" element={<TasksListLayout />} />
                <Route path="/companies" element={<BrowseCompanies />} />
                <Route path="/company/details" element={<CompanyDetails />} />
                <Route path="/task/details" element={<TaskDetails />} />
                <Route path="/job/details" element={<JobDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </DashboardLayout>
          }
        />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

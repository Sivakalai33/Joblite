import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";



import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";

import CreateJob from "./pages/CreateJob";
import LoginForm from "./pages/LoginForm";


import Register from "./pages/Register";



function App() {
  return (
    <>

      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route path="/home" element={<Jobs />} />


        {/* Single Job Details */}
       <Route path="/jobs/:job_id" element={<JobDetails />} />

        {/* Create Job */}
        <Route path="/create-job" element={<CreateJob />} />

        {/* Login */}
        <Route path="/" element={<LoginForm />} />

        <Route path="/register" element={<Register />} />


      </Routes>

  </>
  );
}

export default App;
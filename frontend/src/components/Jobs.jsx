import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Jobs() {

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data.data); // important

    } catch (err) {

      console.log("Error fetching jobs", err);

    }

  };

  

  useEffect(() => {

    fetchJobs();

  }, []);

  return (

    <div className="jobs-container">

      <div className="jobs-grid">

        {jobs.map((job) => (

          <div key={job.job_id || job.id} className="job-card">

            <h3>{job.job_title}</h3>

            <p>
              <strong>Company:</strong> {job.company_name}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong> {job.salary}
            </p>

            <Link to={`/jobs/${job.job_id}`}>
              <button className="details-btn">
                View Details
              </button>
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}
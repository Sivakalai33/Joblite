import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function JobDetails() {
   const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.l_role;
  const user_id = 1;
  const { job_id } = useParams();
  const [job, setJob] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {

    const fetchJob = async () => {
      try {
        const res = await API.get(`/joballdetail/${job_id}`);
        
        setJob(res.data.data);
      } 
      catch (err) {
          const errorMessage =
                err.response?.data?.message || err.message ||"Error fetching job detail";
          setMessage(errorMessage);
          setMessageType("error");
          console.log("Error fetching job detail", err);
      }
    };

    fetchJob();

  }, [job_id]);

  if (!job) return <p>Loading...</p>;

  const applyJob = async () => {

  try {
    const res = await API.post(`/apply_job/${job_id}`, {
      user_id
    });

    setMessage(res.data.message);
    setMessageType("success");
  } 
  catch (err) {

      const errorMessage =
              err.response?.data?.message || err.message ||"Error applying job";
      setMessage(errorMessage);
      setMessageType("error");
      console.log("Error applying job ", err);

  }
  
  
  };

  return (
    <>
            {message && (
                <div className={`message-box ${messageType}`}>
                    {message}
                </div>
            )}

    <div className="divbox">
      <br/>
      <div className="divgrid" id="jobdetails">
      <h2>{job.job_title}</h2><br/>
      <p><b>Company:</b> {job.company_name}</p><br/>
      <p><b>Location:</b> {job.location}</p><br/>
      <p><b>Salary:</b> {job.salary}</p><br/>
      <p><b>Job Type:</b> {job.job_type}</p><br/>
      <p><b>Experience:</b> {job.experience}</p><br/>
      <p><b>Skills:</b> {job.skills}</p><br/>
      <p><b>Description:</b> {job.description}</p><br/>
          
      {role !== "admin" && (
      <button className="apply-btn" onClick={applyJob}> Apply Job </button>
      
      )}

    </div>
    </div>
  </>
  );
}
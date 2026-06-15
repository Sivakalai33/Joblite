import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [job, setJob] = useState({
        job_title: "",
        company_name: "",
        location: "",
        salary: "",
        job_type: "",
        description: "",
        experience: "",
        skills: "",
    });

    // Handle Input
    const handleInputChange = (field, value) => {

        setJob((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // Reset
    const handleReset = () => {

        setJob({
            job_title: "",
            company_name: "",
            location: "",
            salary: "",
            job_type: "",
            description: "",
            experience: "",
            skills: "",
           
        });
    };

    // Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validation
        if (!job.job_title) {
            setMessage("Enter job title");
            setMessageType("error");
            return;
        }

        if (!job.company_name) {
            setMessage("Enter company name");
            setMessageType("error");
            return;
        }

        if (!job.location) {
            setMessage("Enter location");
            setMessageType("error");
            return;
        }

        if (!job.salary) {
            setMessage("Enter salary");
            setMessageType("error");
            return;
        }

        if (!job.job_type) {
            setMessage("Enter job type");
            setMessageType("error");
            return;
        }

        if (!job.description) {
            setMessage("Enter description");
            setMessageType("error");
            return;
        }

        if (!job.experience) {
            setMessage("Enter experience");
            setMessageType("error");
            return;
        }

        if (!job.skills) {
            setMessage("Enter skills");
            setMessageType("error");
            return;
        }

        try {

            const res = await API.post("/add_job",job);

            setMessage(res.data.message);
            setMessageType("success");

            handleReset();

            setTimeout(() => {

                navigate("/home");

            }, 2000);

        }
        catch (err) {

            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Error creating job";

            setMessage(errorMessage);
            setMessageType("error");
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

                <form
                    className="divgrid"
                    onSubmit={handleSubmit}
                >

                    <h2>Create Job</h2>

                    <input
                        type="text"
                        placeholder="Job Title"
                        value={job.job_title}
                        onChange={(e) =>
                            handleInputChange(
                                "job_title",
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Company Name"
                        value={job.company_name}
                        onChange={(e) =>
                            handleInputChange(
                                "company_name",
                                e.target.value
                            )
                        }
                    />

                    <input type="text"  placeholder="Skills" value={job.skills}
    
                        onChange={(e) =>handleInputChange("skills",e.target.value)} />

                    <input
                        type="text"
                        placeholder="Location"
                        value={job.location}
                        onChange={(e) =>
                            handleInputChange(
                                "location",
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Salary"
                        value={job.salary}
                        onChange={(e) =>
                            handleInputChange(
                                "salary",
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Job Type"
                        value={job.job_type}
                        onChange={(e) =>
                            handleInputChange(
                                "job_type",
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        placeholder="Description"
                        value={job.description}
                        onChange={(e) =>
                            handleInputChange(
                                "description",
                                e.target.value
                            )
                        }
                    />

                   <input
    type="text"
    placeholder="Experience"
    value={job.experience}
    onChange={(e) =>
        handleInputChange(
            "experience",
            e.target.value
        )
    }
/>

                   

                    <div className="dbtn">

                        <button type="submit" className="docsubbtn">Create Job </button>
                        <button type="button" className="docsubbtn" id="docresid" onClick={handleReset} > Reset </button>
                       
                    </div>

                </form>

            </div>

        </>
    );
}
import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    l_role: ""
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.email || !data.password || !data.l_role) {
      setMessage("Fill all fields");
      setMessageType("error")
      return;
    }

    try {
      const res = await API.post("/register", data);
      setMessage(res.data.message);
      setMessageType("success");
      localStorage.setItem("user", JSON.stringify(res.data.data));

        // ROLE BASED NAVIGATION
        if (data.l_role === "admin") {
          navigate("/create-job");
        } else {
          navigate("/home");
        }

    } catch (err) {

      const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Error registration";

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
    <form onSubmit={handleSubmit} className="divgrid" id="loginform">
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={data.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => handleChange("password", e.target.value)}
      /><br/>

      {/* ROLE SELECT */}
      <select 
        onChange={(e) => handleChange("l_role", e.target.value)} >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select><br/>

      <button type="submit"  className="loginbtn">
        Register
      </button>
    </form>
    </div>
</>
  );
}
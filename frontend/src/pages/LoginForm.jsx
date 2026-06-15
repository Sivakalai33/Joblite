import { useState } from "react";
import API from "../api/api";
import { Link,useNavigate } from "react-router-dom";

export default function LoginForm() {
  
   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("");
  const [data, setData] = useState({
    email: "",
    password: ""
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

    if (!data.email || !data.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await API.post("/login", data);

      if (res.data.status === "success") {
        alert("Login success");

        // store user
        localStorage.setItem("user", JSON.stringify(res.data.data));

        navigate("/home"); // redirect to jobs page
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      alert("Login failed");
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
    <form onSubmit={handleSubmit} id="loginform" className="divgrid" >
      <h2>Login</h2>
      <br/>
      <select
        onChange={(e) => handleChange("l_role", e.target.value)} >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

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
      />
      <br/><br/>
      <Link to="/register" className="signup">Create new account</Link>

      <button type="submit" className="loginbtn">Login</button><br/><br/>
      
    </form>

    </div>

</>
  );
}
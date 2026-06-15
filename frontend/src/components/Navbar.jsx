import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.l_role;

  const isLoggedIn = !!user;

  // logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">

     
      

      {/* ADMIN ONLY */}
      {role === "admin" && (
        <Link to="/create-job">Create Job</Link>
      )}

      {/* NOT LOGGED IN */}
      {!isLoggedIn ? (
        <>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
         <Link to="/home">Home</Link>
        <button onClick={handleLogout} className="logoutbtn">Logout</button>
        </>
      )}

    </nav>
  );
}
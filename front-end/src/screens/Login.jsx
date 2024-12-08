import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Assuming you are using a regular CSS file for styling

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      if (!json.success) {
        toast.error("Enter valid details", {
          position: "top-center", // Centered toast
          autoClose: 3000, // Time duration for the toast
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          style: {
            fontSize: "18px", // Bigger text size
            textAlign: "center", // Center text
            borderRadius: "10px", // Rounded corners
            padding: "20px", // More padding for a bigger toast
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" // Adding shadow
          }
        });
      } else {
        toast.success("Logged in successfully!", {
          position: "top-center", // Centered toast
          autoClose: 3000, // Time duration for the toast
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          style: {
            fontSize: "18px", // Bigger text size
            textAlign: "center", // Center text
            borderRadius: "10px", // Rounded corners
            padding: "20px", // More padding for a bigger toast
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" // Adding shadow
          }
        });
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        setTimeout(() => navigate('/'), 2000); // Navigate after 2 seconds
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error("Failed to sign up. Please try again.", {
        position: "top-center", // Centered toast
        autoClose: 3000, // Time duration for the toast
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        style: {
          fontSize: "18px", // Bigger text size
          textAlign: "center", // Center text
          borderRadius: "10px", // Rounded corners
          padding: "20px", // More padding for a bigger toast
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" // Adding shadow
        }
      });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div id="a" className='login-container'>
      <form onSubmit={onClickHandler} id="b">
        <div className="form-group" id="c">
          <label htmlFor="email" id="d">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={credentials.email} onChange={onChange} />
        </div>
        <div className="form-group" id="e">
          <label htmlFor="password" id="f">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-success" id="g">Submit</button>
        <Link to="/createuser" className="btn btn-danger" id="h">I am a new user</Link>
      </form>
      <ToastContainer />
    </div>
  );
}

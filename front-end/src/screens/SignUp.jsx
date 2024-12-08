import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const onClickHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        toast.error("Enter valid details. Registration failed!", {
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
        toast.success("Registration successful!", {
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
        setCredentials({ name: "", email: "", password: "", geolocation: "" });
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
    <div className='container'>
      <form onSubmit={onClickHandler}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            name='name'
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name='email'
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name='password'
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="geolocation">Enter Your Address</label>
          <input
            type="text"
            className="form-control"
            id="geolocation"
            placeholder="Address"
            name='geolocation'
            value={credentials.geolocation}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <Link to="/Login" className='m-3 btn btn-danger'>Already a user</Link>
      </form>
      <ToastContainer />
    </div>
  );
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

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
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Details");
      }
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate('/')
      }

    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Failed to sign up. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className='container'>
      <form onSubmit={onClickHandler}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user</Link>
      </form>
    </div>
  )
}

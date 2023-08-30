import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";


function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name] : [event.target.value]}));
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:8081/signup", values)
    .then(res => {
      console.log(res);
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-danger vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className="form-control rounded-0"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          <p>You are agree to our term and policies</p>
          <Link to="/login">
            <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
              Login
            </button>
          </Link>
        </form>

      </div>
    </div>
  );
}

export default Signup;

import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8081")
      .then((res) => {
        // console.log("hello gautam",res);
        if (res.data.valid) {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if(res.data.Login){
          navigate("/");
        }else{
          alert("No Record")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-danger vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
          <p>You are agree to our term and policies</p>
          <Link to="/signup">
            <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
              Create Account
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

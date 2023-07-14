import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("password doesn't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
      } catch (err) {}
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SOCIAL-APP</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SOCIAL-APP.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
            />
            <input placeholder="Email" ref={email} className="loginInput" />
            <input
              type={password}
              placeholder="Password"
              ref={password}
              className="loginInput"
            />
            <input
              type={password}
              placeholder="Password Again"
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              <Link to="/login" className="link">
                Log into Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

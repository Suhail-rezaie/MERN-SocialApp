import { CircularProgress } from "@mui/material";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
            <input placeholder="Email" ref={email} className="loginInput" />

            <input
              ref={password}
              placeholder="Password"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              {/* {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )} */}
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link to="/register" className="link">
                Create a New Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

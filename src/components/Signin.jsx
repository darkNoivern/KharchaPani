import React from "react";
import { Link } from "react-router-dom";
import "../styles/signup.css";
import { useNavigate } from 'react-router-dom'

const Signin = (props) => {

  const navigate = useNavigate();

  console.log(props.toggleUser);

  const userSignIn = () => {
    props.toggleUser(true);
    navigate('/transactions');
  } 

  return (
    <>
      <div className="page px-3 px-md-5 flexy">
        <div className="sign-in-box">
          <div className="flexy">
            <button
            onClick={()=>{
              console.log(1);
              userSignIn();
            }}
            className="button curve-btn ui bg-gate mouse400 sign-round sign-btn mx-0 my-3">
              <i class="google icon me-2"></i>
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

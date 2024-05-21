import React, { useEffect, useState } from "react";
//import Home from "../HomePage/Home";
import './login.css'
import { Navigate } from "react-router-dom";
//import {Navigate} from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";



function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [userName,setName]=useState('')
  const [userPwd,SetPwd]=useState('')
  const errors = {
    msg: "invalid username or password", 
  };

  function setCookies(name,cvalue) {
    document.cookie = name + "=" + cvalue 
  }
  function createUser(){ 
    axios.put('http://localhost:8080/create-user', {
      name: userName,
      pwd: userPwd
    })
    .then((res)=> {
          alert(res.data)
        
    })
    .catch(function (error) {
      alert('user already exist')
    });

  }

  function postRequest(uname,pass){ 
    axios.post('http://localhost:8080/login', {
      name: uname,
      pwd: pass
    })
    .then((res)=> {
      if(res.headers.get('token')){
      setCookies('token',res.headers.get('token'))
      setIsSubmitted(true);     
      }
      else{
        console.log(res.headers.get('token'))
        setErrorMessages({ name: "Invalid_credentials", message: errors.msg });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  const handleSignIn=()=>{
    //event.preventDefault();
    createUser()
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postRequest(event.target.uname.value,event.target.pass.value)
   };

   useEffect(()=>{
      removeCookie('token')
   },[])

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
      {renderErrorMessage("Invalid_credentials")}
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" onChange={e => setName(e.target.value)}   required />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" onChange={e => SetPwd(e.target.value)}   required />
        </div>
        <div className="button-container">
        <button className="sub" type="submit"> Log In</button>
        </div>
      </form>
      <button className="sub" onClick={handleSignIn}> Sign In</button>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <Navigate replace to="/home" />: renderForm} 
      </div>
    </div>
  );
}

export default Login;


//npm install react-bootstrap bootstrap
//npm i react-cookie
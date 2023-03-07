import React, {useEffect, useState}from 'react'
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from "axios"
import ViewProduct from './ViewProduct';
import Navbar from '../Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Login.css"
import AxiosApi, {headersCors} from "../Utils/AxiosApi"
const Login = () => {


  const [login, setLogin] =useState([])
  const navigate = useNavigate()
  const handdleSubmit =(e) => {
    let name = e.target.name;
    let value = e.target.value
    setLogin({...login, [name] :value})
  
  } 

  const onSubmit = async (event)=>  {
      

        event.preventDefault()
               const res = await axios.post('/login',{
                  ...login,
                },
                {
                  withCredentials:true,
                  headers: {
                    "ngrok-skip-browser-warning": "69420",
                  }
                })
                console.log(res.data.messagecbb)
                if(res.data.message === "Login Successfull"){
                  localStorage.setItem("user_id", res.data.Id)
                  localStorage.setItem("role", res.data.role)
                  navigate('/dashboard')
                } else{
                  alert(res.data.message)
                }
}
  
  return (
    <>
    <Navbar/>
    <div class="container-fluid d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				<span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
				<h4 class="company_title">Acenet</h4>
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid p-5">
					<div class="row">
						<h2>Log In</h2>
					</div>
					<div class="row">
						<form control="" class="form-group">
							<div class="row">
								<input onChange={handdleSubmit}  type="text" name="email" id="username" class="form__input" placeholder=""/>
							</div>
							<div class="row">
								{/* <!-- <span class="fa fa-lock"></span> --> */}
								<input onChange={handdleSubmit}  type="password" name="password" id="password" class="form__input" placeholder="Password"/>
							</div>
							{/* <div class="row">
								<input type="checkbox" name="remember_me" id="remember_me" class=""/>
								<label for="remember_me">Remember Me!</label>
							</div> */}
							<div class="row">
								{/* <input   type="submit" value="Submit" class="btn"/> */}
                <button className='btn btn-info bg-light' onClick={onSubmit}>Log In</button>
							</div>
						</form>
					</div>
					<div class="row">
						<p>Don't have an account? <a href="#"> <NavLink to="/signup"> Register Here </NavLink> </a></p>
					</div>
				</div>
			</div>
		</div>
	</div>

</>
  )}
    /* <div style={{width:"50%", margin:"auto"}}>
    <h2> Login </h2>
    
    <form  method="post">

        <div className="container">
        <label for="uname"><b>Email</b></label>
        <input onChange={handdleSubmit} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" required   />

        <label for="psw"><b>Password</b></label>
        <input onChange={handdleSubmit} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password" name="password" required />
            
        <button className='btn btn-primary' type="submit" onClick={onSubmit}>Login</button>
        {/* <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember me
        </label> 
        </div>

        <div className="container" style={{backgroundColor:"#f1f1f1"}}>
        {/* <span className="psw">Forgot <a href="#">password?</a></span> 
        <p className="psw">Not a member? <NavLink to="/signup"> Signup</NavLink></p>
        </div>

    </form>

</div>
</> */
  


export default Login
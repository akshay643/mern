import React, {useEffect, useState} from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Navbar from '../Navbar';
import { NavLink } from 'react-router-dom';
import "./Login.css"
import { Navigate } from 'react-big-calendar';
const SignUp = () => {
  const[data, setData] = useState([])


  const handdleSubmit =(e) => {
    let name = e.target.name;
    let value = e.target.value
    setData({...data, [name] :value})
  
  } 
  
  function onSubmit (event)  {
      

          event.preventDefault()
          // console.log(data)
      // main.js

      // POST request using fetch()
      fetch(`http://localhost:5500/register`, {

      // // Adding method type
      method: "POST",

      // // Adding body or contents to send
      body:JSON.stringify({...data,role:1}) ,

      // // Adding headers to the request
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
      })

      // Converting to JSON
      .then(response => response.json())

      // Displaying results to alert
      .then(json => {
        if(json.message === "successfully registered"){
          alert(json.message)
          Navigate('/')
        }
        

      });

}

  


  return (
    <>
    <Navbar />
    <div class="container-fluid d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				<span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
				<h4 class="company_title">Acenet</h4>
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid p-5">
					<div class="row">
						<h2>Sign Up</h2>
					</div>
					<div class="row">
						<form control="" class="form-group">
							<div class="row">
								<input onChange={handdleSubmit}  type="text" name="name" id="username" class="form__input" placeholder="enter your name"/>
							</div>
							<div class="row">
								<input onChange={handdleSubmit}  type="email" name="email" id="email" class="form__input" placeholder="enter your email"/>
							</div>
							<div class="row">
								{/* <!-- <span class="fa fa-lock"></span> --> */}
								<input onChange={handdleSubmit}  type="password" name="password" id="password" class="form__input" placeholder="Password"/>
							</div>
							<div class="row">
								{/* <!-- <span class="fa fa-lock"></span> --> */}
								<input onChange={handdleSubmit} type="number" name="phone" id="password" class="form__input" placeholder="Phone"/>
							</div>
							{/* <div class="row">
								<input type="checkbox" name="remember_me" id="remember_me" class=""/>
								<label for="remember_me">Remember Me!</label>
							</div> */}
							<div class="row">
								{/* <input   type="submit" value="Submit" class="btn"/> */}
                <button className='btn btn-info bg-light' onClick={onSubmit}>Signup</button>
							</div>
						</form>
					</div>
					<div class="row">
						<p>Already have an account? <a href="#"> <NavLink to="/"> Login Here </NavLink> </a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/* <div style={{width:"50%", margin:"auto"}} >
  <form >
    <div className="container" >
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />
      <label for="name"><b>Name</b></label>
      <input onChange={handdleSubmit} type="name" placeholder="Enter yoour name" name="name" required />

      <label for="email"><b>Email</b></label>
      <input onChange={handdleSubmit} type="email" placeholder="Enter Email" name="email" required />

      <label for="password"><b>Password</b></label>
      <input onChange={handdleSubmit} type="password" placeholder="Enter Password" name="password" required />

      <label for="phone"><b>Phone</b></label>
      <input onChange={handdleSubmit} type="phone" placeholder="Enter Password" name="phone" required />

      <label>
        <input type="checkbox" checked="checked" name="remember" style={{marginBottom:"15px"}} /> Remember me
      </label>

      <p>By creating an account you agree to our <a href="#" style={{color:"dodgerblue"}}>Terms & Privacy</a>.</p>

      <div className="clearfix">
        <button type="submit" onClick={onSubmit} className="signupbtn">Sign Up</button>
      </div>
      <p className="psw">Already a member? <NavLink to="/">Login</NavLink></p>

    </div>
  </form>
</div> */}


    </>
  )
}

export default SignUp;
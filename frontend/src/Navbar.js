        import React, {useState} from 'react'
        import { NavLink, useNavigate } from 'react-router-dom'
        import "./Navbar.css"
        import {useCookies} from "react-cookie"

const Navbar = () => {
          const [cookies, setCookie, removeCookie] = useCookies([])
          const navigate = useNavigate()

          const loggedin =  localStorage.getItem("user_id")
          let admin = localStorage.getItem("role")

        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-teal" style={{backgroundColor:"#008080", padding:"1rem"}}>
                <a className="navbar-brand text-white" href="#">
                  Acenet
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav d-flex align-items-center justify-content-center">
                    {/* <NavLink to='/signup' className="nav-link">
                      <span className='text-white'>SignUp</span>
                    </NavLink> */}

                    {!loggedin ?
                    <NavLink to='/' className="nav-link">
                      <span className='text-white'>Login</span>
                    </NavLink>
                    :""}

                    {admin === "2" ?
                    <NavLink to='/admin' className="nav-link">
                      <span className='text-white'>Admin</span>
                    </NavLink>
                    :""}
                    <NavLink to='/dashboard' className="nav-link">
                      <span className='text-white'>Dashboard</span>
                    </NavLink>
                  </div>
                  <div style={{marginLeft:"auto"}}>

                    {loggedin ?

                    <button
                    class="dropdown-item "
                   
                    onClick={() => {
                      const confirmationButton = window.confirm(
                        "Do you really want to Log Out?"
                      );
                      if (confirmationButton === true) {
                        // setIsLoggedOut(false)
                        localStorage.clear();
                        removeCookie('jwt');
                        navigate("/");
                      }
                    }}
                  >
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </button> :""}
                  </div>
                </div>
              </nav>
        )
        }

        export default Navbar
"use client"

import Image from 'next/image'
import React, { Component } from 'react'
import navlogo from "../../assets/images/b25932c7e01c030a3fff68a60dfaebd079f78f6b (1).avif";
import { logoutUser } from "../../Api/Logoutapi"; 

export class Navbar extends Component {

  handleLogout = async () => {
    try {
      // await logoutUser();
      
      localStorage.removeItem("token");
      
      window.location.href = "/login";
      
    } catch (error) {
      // console.log("Logout Error:", error);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  render() {
    return (
      <nav className="navbar navbar-dark py-2" style={{ backgroundColor: '#0a2463' }}>
        <div className="container d-flex justify-content-between align-items-center"> 
          
          <a className="navbar-brand p-0" href="/">
            <Image 
              src={navlogo}
              alt="Mega Nursing Logo" 
              style={{ height: '60px', width: 'auto' }} 
              className="d-inline-block align-top"
              priority 
            />
          </a>

          <button 
            onClick={this.handleLogout}
            className="btn btn-link text-white text-decoration-none d-flex align-items-center fw-bold"
            style={{ fontSize: '14px', letterSpacing: '1px' }}
          >
            <i className="fas fa-power-off me-2 text-danger"></i> 
            LOGOUT
          </button>

        </div>
      </nav>
    )
  }
}

export default Navbar
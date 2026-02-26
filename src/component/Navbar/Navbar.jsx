"use client"

import Image from 'next/image'
import React, { Component } from 'react'
import navlogo from "../../assets/images/b25932c7e01c030a3fff68a60dfaebd079f78f6b (1).avif";

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark py-3" style={{ backgroundColor: '#0a2463' }}>
        <div className="container ps-2"> 
          <a className="navbar-brand p-0" href="#">
            <Image 
              src={navlogo}
              alt="Mega Nursing Logo" 
              style={{ height: '65px', width: 'auto' }} 
              className="d-inline-block align-top"
              priority 
            />
          </a>
        </div>
      </nav>
    )
  }
}

export default Navbar
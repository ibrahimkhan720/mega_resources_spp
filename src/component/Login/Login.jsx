"use client"

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <div className="glass-card col-11 col-sm-8 col-md-5 col-lg-4">
          
          <div className="text-center mb-4">
            <h2 className="logo-text">MEGA</h2>
            <p className="subtitle">Nursing & Care Portal</p>
          </div>

          <form>
            <div className="mb-3">
              <label className="form-label text-white fw-bold">Staff ID / Email</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="Enter your ID" 
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-bold">Password</label>
              <input 
                type="password" 
                className="form-control custom-input" 
                placeholder="••••••••" 
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input custom-checkbox" 
                  id="rememberMe" 
                />
                <label className="form-check-label text-white small" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="btn-login w-100">
              LOGIN
            </button>
          </form>
        </div>

        <div className="footer-tagline">
           <p>One Team | One Vision | One Company</p>
        </div>
      </div>
    )
  }
}

export default Login
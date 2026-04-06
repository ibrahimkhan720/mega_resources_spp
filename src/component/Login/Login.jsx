"use client"

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser } from '../../Api/Loginapi'; 
import navlogo from "../../assets/images/b25932c7e01c030a3fff68a60dfaebd079f78f6b (1).avif";
import Image from 'next/image';

export class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: '' 
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Please enter both Staff ID and Password." });
      return;
    }

    try {
      const res = await loginUser({
        email,
        password
      });

      localStorage.setItem("token", res.token);
      window.location.href = "/";

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      this.setState({ error: errorMessage });
      console.log("Login Error:", error.response?.data);
    }
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="glass-card col-11 col-sm-8 col-md-5 col-lg-4">
          
          <div className="text-center mb-4">
           <Image 
              src={navlogo}
              alt="Mega Nursing Logo" 
              style={{ height: '65px', width: 'auto' }} 
              className="d-inline-block align-top"
              priority 
            />
          </div>

          {this.state.error && (
            <div className="alert alert-danger py-2 text-center" style={{ fontSize: '14px' }}>
              <i className="fas fa-exclamation-circle me-2"></i>
              {this.state.error}
            </div>
          )}

          <form onSubmit={this.handleSubmit}>

            <div className="mb-3">
              <label className="form-label text-white fw-bold">Staff ID / Email</label>
              <input 
                type="text" 
                name="email"
                className={`form-control custom-input ${this.state.error ? 'is-invalid' : ''}`} 
                placeholder="Enter your ID"
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-bold">Password</label>
              <input 
                type="password" 
                name="password"
                className={`form-control custom-input ${this.state.error ? 'is-invalid' : ''}`} 
                placeholder="••••••••"
                onChange={this.handleChange}
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
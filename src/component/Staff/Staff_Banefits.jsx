"use client"

import Link from 'next/link'
import React, { Component } from 'react'

export class Staff_Banefits extends Component {
  render() {
    return (
      <div className=" main_card_banefits container-fluid">
        {/* Back Link */}
        <div className="">
          <Link href="/" className="text-decoration-none d-flex align-items-center" style={{ color: '#003366', fontWeight: '700' , marginBottom: '2rem' , fontSize: '18px' }}>
            <span className="me-2">←</span> Back to Dashboard
          </Link>
        </div>

        {/* Main Card Wrapper */}
        <div className="card_banefits border-0 shadow-sm pt-4 pb-5" style={{ borderRadius: '20px', backgroundColor: '#ffffff' }}>
          
          {/* Header Section */}
          <div className="d-flex align-items-center mb-4">
            <div className="me-3">
              {/* Target Icon Placeholder */}
              <div style={{ fontSize: '40px' }}>🎯</div>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#002b5c', fontSize: '28px' }}>Staff Benefits</h2>
              <p className="text-muted m-0">Pay Advances, Mental Health Support, Car Maintenance Scheme & More</p>
            </div>
          </div>

          {/* Blue Section */}
          <div className="p-4" style={{ 
            backgroundColor: '#1a3a8a', 
            borderRadius: '15px', 
            color: 'white' 
          }}>
            <h4 className=" mb-2" style={{ fontWeight: "500 !important" }}>Why Work With MEGA?</h4>
            <p className="m-0" style={{ opacity: '0.9', lineHeight: '1.6', fontSize: '15px' }}>
              We believe in supporting our staff with comprehensive benefits that go beyond just a paycheck. 
              From financial support to career development, we're invested in your success and well-being.
            </p>
          </div>

        </div>
      </div>
    )
  }
}

export default Staff_Banefits
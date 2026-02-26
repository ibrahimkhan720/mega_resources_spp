"use client"

import Link from 'next/link'
import React, { Component } from 'react'

export class Staff_Points_Plan extends Component {
  render() {
    return (
      <div className="staff_points_plan container-fluid mt-4">
        {/* Back Link */}
        <div className="mb-3">
          <Link href="/" className="text-decoration-none d-flex align-items-center" style={{ color: '#003366', fontWeight: '600', fontSize: '15px' }}>
            <span className="me-2">←</span> Back to Dashboard
          </Link>
        </div>

        {/* Main White Card Wrapper - Reduced Padding */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', backgroundColor: '#ffffff', padding: '25px 35px' }}>
          
          {/* Header Section - More compact spacing */}
          <div className="d-flex align-items-center mb-3">
            <div className="me-3" style={{ fontSize: '40px' }}>🎁</div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#1a4da1', fontSize: '26px' }}>Staff Points Plan</h2>
              <p className="text-muted m-0" style={{ fontSize: '14px' }}>Win a range of prizes including gadgets, Annual Leave, Cash & More</p>
            </div>
          </div>

          {/* Points Status Row - Reduced minHeight and Padding */}
          <div className="row g-3 mb-4">
            {/* Blue Box */}
            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center" style={{ backgroundColor: '#2b7fff', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Your Current Points</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>2,450</h2>
              </div>
            </div>

            {/* Green Box */}
            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center" style={{ backgroundColor: '#00c853', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Points Earned This Month</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>350</h2>
              </div>
            </div>

            {/* Purple Box */}
            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center" style={{ backgroundColor: '#a033ff', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Rewards Redeemed</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>3</h2>
              </div>
            </div>
          </div>

          {/* How to Earn Points Section - Compact Padding and List Spacing */}
          <div className="p-3" style={{ backgroundColor: '#f0f7ff', borderRadius: '15px', border: '1px solid #d0e4ff' }}>
            <h6 className="fw-bold mb-3" style={{ color: '#002b5c', fontSize: '16px' }}>How to Earn Points</h6>
            <ul className="list-unstyled mb-0" style={{ fontSize: '13.5px' }}>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2 text-success" style={{ fontWeight: 'bold' }}>✓</span>
                <span><strong>Attendance:</strong> Earn 10 points for each shift completed on time</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2 text-success" style={{ fontWeight: 'bold' }}>✓</span>
                <span><strong>Perfect Week:</strong> Complete all scheduled shifts in a week for 100 bonus points</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2 text-success" style={{ fontWeight: 'bold' }}>✓</span>
                <span><strong>Training:</strong> Complete mandatory training modules for 50 points each</span>
              </li>
              <li className="d-flex align-items-center">
                <span className="me-2 text-success" style={{ fontWeight: 'bold' }}>✓</span>
                <span><strong>Recognition:</strong> Receive positive feedback from clients or managers for 25 points</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    )
  }
}

export default Staff_Points_Plan
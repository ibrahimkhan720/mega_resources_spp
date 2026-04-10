"use client"

import Link from 'next/link'
import React, { Component } from 'react'
import { getStaffProfile } from "../../Api/Rewardapi"

export class Staff_Points_Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffData: {
        points: 0,           
        monthly_points: 0,   
        redeemed_count: 0
      }
    };
  }

  async componentDidMount() {
    try {
      const profile = await getStaffProfile();
      
      if (profile) {
        const now = new Date();
        const currentMonth = now.getMonth(); // April = 3
        const currentYear = now.getFullYear();

        // Backend se aane wali 'updated_at' date
        const lastUpdate = new Date(profile.updated_at);
        
        let monthlyPoints = 0;

        // Agar last update isi mahine aur isi saal ka hai, 
        // toh hum maan lenge ke ye points isi mahine mile hain.
        if (lastUpdate.getMonth() === currentMonth && lastUpdate.getFullYear() === currentYear) {
            monthlyPoints = Number(profile.points) || 0;
        } else {
            // Agar pichle mahine update hua tha, toh monthly 0 dikhayega
            monthlyPoints = 0;
        }

        this.setState({
          staffData: {
            points: Number(profile.points) || 0,
            monthly_points: monthlyPoints, 
            redeemed_count: Number(profile.redeemed_total) || 0
          }
        });
      }
    } catch (error) {
      console.error("Backend connection error:", error);
    }
  }

  render() {
    const { staffData } = this.state;

    return (
      <div className="staff_points_plan container-fluid mt-4">
        {/* Back Link */}
        <div className="mb-3">
          <Link href="/" className="text-decoration-none d-flex align-items-center" style={{ color: '#003366', fontWeight: '600', fontSize: '15px' }}>
            <span className="me-2">←</span> Back to Dashboard
          </Link>
        </div>

        {/* Main Card */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', backgroundColor: '#ffffff', padding: '25px 35px' }}>
          
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div className="me-3" style={{ fontSize: '40px' }}>🎁</div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#1a4da1', fontSize: '26px' }}>Staff Points Plan</h2>
              <p className="text-muted m-0" style={{ fontSize: '14px' }}>Track your monthly progress and rewards</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="row g-3 mb-4">
            {/* Total Balance */}
            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center shadow-sm" style={{ backgroundColor: '#2b7fff', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Total Balance</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>{staffData.points.toLocaleString()}</h2>
              </div>
            </div>

            {/* Earned This Month (Based on updated_at) */}
            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center shadow-sm" style={{ backgroundColor: '#00c853', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Earned This Month</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>{staffData.monthly_points.toLocaleString()}</h2>
              </div>
            </div>

            {/* Redeemed Count */}
            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center shadow-sm" style={{ backgroundColor: '#a033ff', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Rewards Claimed</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>{staffData.redeemed_count}</h2>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="p-3" style={{ backgroundColor: '#f0f7ff', borderRadius: '15px', border: '1px solid #d0e4ff' }}>
            <h6 className="fw-bold mb-3" style={{ color: '#002b5c', fontSize: '16px' }}>How Your Points Grow</h6>
            <div className="row">
                <div className="col-md-12 mb-2"><strong>✓ Attendance:</strong> 10 points per on-time shift.</div>
                <div className="col-md-12 mb-2"><strong>✓ Bonus:</strong> 100 points for a perfect week.</div>
                <div className="col-md-12 mb-2"><strong>✓ Training:</strong> 50 points per module.</div>
                <div className="col-md-12 mb-2"><strong>✓ Feedback:</strong> 25 points for client praise.</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Staff_Points_Plan;
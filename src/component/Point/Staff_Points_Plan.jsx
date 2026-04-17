"use client"

import Link from 'next/link'
import React, { Component } from 'react'
import { getStaffProfile } from "../../Api/Rewardapi"
import { getstaffpointdetail } from '@/Api/StaffPointDetailapi'

export class Staff_Points_Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffData: {
        points: 0,           
        monthly_points: 0,   
        redeemed_count: 0
      },
      loading: true 
    };
  }

  async componentDidMount() {
    try {
      const [profile, detailRes] = await Promise.all([
        getStaffProfile(),
        getstaffpointdetail()
      ]);

      if (profile && detailRes && detailRes.data) {
        
        const monthlyPoints = detailRes.data.points_earned_this_month || 0;
        const claimsArray = detailRes.data.reward_claims || [];

        this.setState({
          staffData: {
            points: Number(profile.points) || 0, 
            monthly_points: Number(monthlyPoints), 
            redeemed_count: claimsArray.length 
          },
          loading: false 
        });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { staffData, loading } = this.state;

    return (
      <div className="staff_points_plan container-fluid mt-4">
        <div className="mb-3">
          <Link href="/" className="text-decoration-none d-flex align-items-center" style={{ color: '#003366', fontWeight: '600', fontSize: '15px' }}>
            <span className="me-2">←</span> Back to Dashboard
          </Link>
        </div>

        <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', backgroundColor: '#ffffff', padding: '25px 35px' }}>
          
          <div className="d-flex align-items-center mb-4">
            <div className="me-3" style={{ fontSize: '40px' }}>🎁</div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#1a4da1', fontSize: '26px' }}>Staff Points Plan</h2>
              <p className="text-muted m-0" style={{ fontSize: '14px' }}>Track your monthly progress and rewards</p>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center shadow-sm" style={{ backgroundColor: '#2b7fff', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Total Balance</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>
                  {loading ? "..." : staffData.points.toLocaleString()}
                </h2>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center shadow-sm" style={{ backgroundColor: '#00c853', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Earned This Month</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>
                  {loading ? "..." : staffData.monthly_points.toLocaleString()}
                </h2>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 d-flex flex-column justify-content-center shadow-sm" style={{ backgroundColor: '#a033ff', borderRadius: '15px', color: 'white', minHeight: '110px' }}>
                <p className="mb-1" style={{ fontSize: '13px', fontWeight: '500', opacity: '0.9' }}>Rewards Claimed</p>
                <h2 className="fw-bold m-0" style={{ fontSize: '34px' }}>
                  {loading ? "..." : staffData.redeemed_count}
                </h2>
              </div>
            </div>
          </div>

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
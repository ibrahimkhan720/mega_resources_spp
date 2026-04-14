"use client"

import React, { Component } from 'react'
import { getreward } from "../../Api/Rewardapi"

export class Award extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rewards: [], 
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const response = await getreward();
      if (response && response.info) {
        this.setState({ rewards: response.info });
      }
    } catch (error) {
      console.error("Error fetching rewards:", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { rewards, loading } = this.state;

    return (
      <div className="rewards-container">
        <div className="rewards-card">
          
          <div className="mb-4">
            <h4 className="fw-bold m-0" style={{ color: '#002b5c', fontSize: '24px' }}>Available Rewards</h4>
            <p className="text-muted" style={{ fontSize: '15px' }}>Redeem your points for any of these great rewards!</p>
          </div>

          <div className="table-responsive">
            <table className="rewards-table">
              <thead>
                <tr>
                  <th>Reward</th>
                  <th style={{ textAlign: 'right' }}>Points</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="2" className="text-center py-3">Loading...</td>
                  </tr>
                ) : rewards.length > 0 ? (
                  rewards.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.reward_title}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="points-badge">{item.point_cost}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-3">No rewards available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 d-flex align-items-center">
            <span className="status-dot"></span>
            <p className="m-0 text-muted" style={{ fontSize: '14px' }}>
              Your current balance allows you to redeem any reward highlighted in green
            </p>
          </div>

        </div>
      </div>
    )
  }
}

export default Award
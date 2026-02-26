"use client"

import React, { Component } from 'react'


export class Award extends Component {
  render() {
    const rewards = [
      { name: "£5 supermarket voucher", points: "500" },
      { name: "Free lunch (up to £10)", points: "1,000" },
      { name: "Costa, Greggs or McDonalds voucher", points: "1,000" },
      { name: "£10 Supermarket voucher", points: "1,000" },
      { name: "Car kit (cleaning kit, de-icer/scraper & air freshener)", points: "1,500" },
      { name: "Relaxing bath kit (bath salts, nice toiletries, candle, etc)", points: "1,500" },
      { name: "Premium Mega Care reusable water bottle / coffee flask", points: "1,500" },
      { name: "Winter care pack (gloves, thermal socks, hand cream, etc.)", points: "1,500" },
      { name: "Pamper kit (skincare face masks, candles, snacks, etc)", points: "1,500" },
      { name: "£20 supermarket voucher", points: "2,000" },
      { name: "Retail store voucher (£20) JD, H&M, Zara, etc", points: "2,000" },
      { name: "Premium tote bag (Mega Care backpack)", points: "2,000" },
    ];

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
                {rewards.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="points-badge">{item.points}</span>
                    </td>
                  </tr>
                ))}
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
"use client"

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export class Mega_Olympics extends Component {
  render() {
    return (
      <div className="mega-container-wrapper">
        
        {/* --- NEWS BAR (Top Navy Bar) --- */}
        <div className="mega-news-bar d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center ">
            <span className="news-label">NEWS</span>
            <span className="news-headline">Mega Olympics 2026 - Are you ready?</span>
          </div>
          <div className="news-end-dot">
             <FontAwesomeIcon icon={faCircle} />
          </div>
        </div>

        {/* --- MAIN GRID (Meetings & Policies) --- */}
        <div className="row g-4 mt-2">
          
          {/* Meetings Card */}
          <div className="col-lg-6">
            <div className="mega-card ">
              <div className="card-header-flex">
                <h2 className="section-title">Meetings</h2>
                <span className="header-dot"></span>
              </div>

              <div className="meetings-content">
                {/* Item 1 */}
                <div className="meeting-row d-flex align-items-start">
                  <div className="date-box">
                    <div className="month">WED</div>
                    <div className="day">30</div>
                    <div className="month">DEC</div>
                  </div>
                  <div className="meeting-text">
                    <h3 className="meeting-name">Staff Meeting <span className="sub-type">- Teams</span></h3>
                    <p className="meeting-time">09:30am</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="meeting-row d-flex align-items-start">
                  <div className="date-box">
                    <div className="month">THU</div>
                    <div className="day">31</div>
                    <div className="month">DEC</div>
                  </div>
                  <div className="meeting-text">
                    <h3 className="meeting-name">Appraisal Meeting <span className="sub-type">- Teams</span></h3>
                    <p className="meeting-time">09:30am</p>
                  </div>
                </div>
              </div>

              <button className="view-all-link">View all</button>
            </div>
          </div>

          {/* Policies Card */}
          <div className="col-lg-6">
            <div className="mega-card" style={{ height: "25rem" }}>
              <div className="card-header-flex">
                <h2 className="section-title">Policies</h2>
                <span className="header-dot"></span>
              </div>

              <div className="policies-scroll-list">
                <div className="policy-item">Employee Handbook</div>
                <div className="policy-item">Safeguarding Policy</div>
                <div className="policy-item">Mental Capacity Act Policy</div>
                <div className="policy-item">Moving & Handling Policy</div>
                <div className="policy-item">Whatsapp Policy</div>
                <div className="policy-item">Lone Working Policy and Procedure</div>
                <div className="policy-item">Code of Conduct Policy</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Mega_Olympics
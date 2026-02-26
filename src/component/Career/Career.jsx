"use client"

import Link from 'next/link';
import React, { Component } from 'react';

export class Career extends Component {
  render() {
    return (
      <div className="career-page-container py-4">
        {/* Font Awesome & Bootstrap Links */}
      

        <div className="container main-wrapper">
          
          {/* Back link - Now Outside the Card */}
          <div className="mb-3 px-2">
            <Link href="/" className="back-link text-decoration-none">
              <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
            </Link>
          </div>

          {/* Main Card */}
          <div className="custom-card p-4 p-md-5 shadow-sm border">
            {/* Header Section */}
            <div className="mb-5">
              <h2 className="fw-bold mb-1" style={{color: '#081c44'}}>Career Pathway</h2>
              <p className="text-muted">Explore progression opportunities and requirements within MEGA CARELINE</p>
            </div>

            {/* Stepper / Level Icons */}
            <div className="row text-center mb-5 align-items-center g-0">
              <div className="col">
                <div className="step-item active">
                  <div className="icon-circle main-icon active-bg"><i className="fa-solid fa-user-doctor"></i></div>
                  <div className="mt-2 fw-bold small-text">Carer</div>
                  <small className="text-muted d-block">Level 1</small>
                </div>
              </div>
              <div className="col-auto"><i className="fa-solid fa-arrow-right text-light-gray"></i></div>
              <div className="col">
                <div className="step-item">
                  <div className="icon-circle main-icon"><i className="fa-solid fa-user-nurse"></i></div>
                  <div className="mt-2 fw-bold small-text">Senior Carer</div>
                  <small className="text-muted d-block">Level 2</small>
                </div>
              </div>
              <div className="col-auto"><i className="fa-solid fa-arrow-right text-light-gray"></i></div>
              <div className="col">
                <div className="step-item">
                  <div className="icon-circle main-icon"><i className="fa-solid fa-user-group"></i></div>
                  <div className="mt-2 fw-bold small-text">Care Coordinator</div>
                  <small className="text-muted d-block">Level 3</small>
                </div>
              </div>
              <div className="col-auto"><i className="fa-solid fa-arrow-right text-light-gray"></i></div>
              <div className="col">
                <div className="step-item">
                  <div className="icon-circle main-icon"><i className="fa-solid fa-user-tie"></i></div>
                  <div className="mt-2 fw-bold small-text">Manager</div>
                  <small className="text-muted d-block">Level 4</small>
                </div>
              </div>
            </div>

            {/* SECTION 1: Carer to Senior Carer */}
            <div className="requirement-section mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h5 className="fw-bold m-0 section-title">Carer &rarr; Senior Carer</h5>
                <span className="badge level-badge-black">Level 1</span>
              </div>
              <p className="text-muted x-small mb-3">Requirements to progress to next level</p>
              
              <div className="list-group mb-3">
                <div className="list-group-item list-completed border-0 mb-2 d-flex align-items-center" style={{ padding: "12px" }}>
                  <i className="fa-solid fa-circle-check tick-small text-success me-3"></i>
                  <del className="text-muted small">Complete Level 2 Diploma in Health & Social Care</del>
                </div>
                <div className="list-group-item list-completed border-0 mb-2 d-flex align-items-center" style={{ padding: "12px" }}>
                  <i className="fa-solid fa-circle-check tick-small text-success me-3"></i>
                  <del className="text-muted small">12 months experience in care role</del>
                </div>
                <div className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                  <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                  <span className="small">Attend mandatory training courses</span>
                </div>
                <div className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                  <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                  <span className="small">Shadow senior staff members</span>
                </div>
                <div className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                  <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                  <span className="small">Receive positive performance reviews</span>
                </div>
              </div>
              <div className="progress-area">
                <div className="d-flex justify-content-between x-small text-muted mb-1">
                  <span>Progress</span>
                  <span>2 / 5</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-success" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Senior Carer to Coordinator */}
            <div className="requirement-section mb-0">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h5 className="fw-bold m-0 section-title">Senior Carer &rarr; Care Coordinator</h5>
                <span className="badge level-badge-black">Level 2</span>
              </div>
              <p className="text-muted x-small mb-3">Requirements to progress to next level</p>
              <div className="list-group mb-3">
                <div className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                  <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                  <span className="small">Complete Level 3 Diploma in Health & Social Care</span>
                </div>
                <div className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                  <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                  <span className="small">18 months experience as Senior Carer</span>
                </div>
                   <div className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                    <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                    <span className="small">Demonstrate leadership skills</span>
                </div>
                   <div className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                    <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                    <span className="small">Complete supervisory training</span>
                </div>
              </div>
              <div className="progress-area">
                <div className="d-flex justify-content-between x-small text-muted mb-1">
                  <span>Progress</span>
                  <span>0 / 5</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-success" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            <div className="requirement-section mb-0 mt-4">
            {/* Header: Title and Level Badge */}
            <div className="d-flex justify-content-between align-items-center mb-1">
                <h5 className="fw-bold m-0 section-title">Care Coordinator &rarr; Manager</h5>
                <span className="badge level-badge-black">Level 3</span>
            </div>
            
            <p className="text-muted x-small mb-3">Requirements to progress to next level</p>
            
            {/* Requirements List */}
            <div className="list-group mb-3">
                <div className="list-group-item border-0 mb-3 d-flex align-items-center bg-light-gray shadow-sm" style={{ padding: "12px" }}>
                <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                <span className="small">Complete Level 5 Diploma in Leadership for Health & Social Care</span>
                </div>
                
                <div className="list-group-item border-0 mb-3 d-flex align-items-center bg-light-gray shadow-sm" style={{ padding: "12px" }}>
                <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                <span className="small">24 months experience as Care Coordinator</span>
                </div>
                
                <div className="list-group-item border-0 mb-3 d-flex align-items-center bg-light-gray shadow-sm" style={{ padding: "12px" }}>
                <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                <span className="small">Complete management training program</span>
                </div>
                
                <div className="list-group-item border-0 mb-3 d-flex align-items-center bg-light-gray shadow-sm" style={{ padding: "12px" }}>
                <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                <span className="small">Demonstrate strategic planning abilities</span>
                </div>
                
                <div className="list-group-item border-0 mb-3 d-flex align-items-center bg-light-gray shadow-sm" style={{ padding: "12px" }}>
                <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                <span className="small">Successfully coordinate multiple care teams</span>
                </div>
            </div>

            {/* Progress Bar Area */}
            <div className="progress-area">
                <div className="d-flex justify-content-between x-small text-muted mb-1">
                <span>Progress</span>
                <span>0 / 5</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: '0%' }} 
                    aria-valuenow="0" 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Career;
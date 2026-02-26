"use client"

import Link from 'next/link';
import React, { Component } from 'react'


export class Jobs extends Component {
  render() {
    return (
      <div className="jobs-page-container pt-5">
      
        <div className="container main-wrapper">
          
          {/* Back link */}
          <div className="mb-2">
            <Link href="/" className="back-link text-decoration-none">
              <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
            </Link>
          </div>

          <div className="mb-4">
            <h1 className="fw-bold mb-1 header-dark">Job Openings</h1>
            <p className="text-muted sub-header">Current vacancies and opportunities at MEGA CARELINE</p>
          </div>

          <div className="row g-4 mb-5">
            {[
              { label: 'Open Positions', count: '4', color: 'blue' },
              { label: 'Total Applicants', count: '41', color: 'blue' },
              { label: 'Departments Hiring', count: '3', color: 'green' },
              { label: 'Interviews Scheduled', count: '5', color: 'purple' }
            ].map((stat, index) => (
              <div className="col-md-3" key={index}>
                <div className="stat-card p-4">
                  <h2 className={`fw-bold mb-1 stat-number-${stat.color}`}>{stat.count}</h2>
                  <div className="stat-label text-muted fw-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="job-card-premium p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div className="d-flex align-items-center">
                <div className="job-icon-box-modern me-3">
                  <i className="fa-solid fa-briefcase"></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-1 job-title-text">Senior Carer</h4>
                  <div className="job-meta-modern d-flex flex-wrap gap-3 text-muted">
                    <span><i className="fa-solid fa-location-dot me-1"></i> Croxes Care Home</span>
                    <span><i className="fa-solid fa-clock me-1"></i> Full-time</span>
                    <span><i className="fa-solid fa-users me-1"></i> 12 applicants</span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary-modern">View Applications</button>
                <button className="btn btn-outline-modern">Edit Posting</button>
              </div>
            </div>

            <div className="job-body mt-4">
              <p className="text-secondary description-text">
                We are looking for an experienced Senior Carer to join our team at Croxes. The ideal candidate will have Level 3 qualification and proven leadership skills.
              </p>
              
              <div className="requirements-box mt-4">
                <p className="req-header-text">REQUIREMENTS</p>
                <ul className="req-list-modern">
                  <li>Level 3 Diploma in Health & Social Care</li>
                  <li>Minimum 2 years care experience</li>
                  <li>Strong leadership abilities</li>
                  <li>Excellent communication skills</li>
                </ul>
              </div>
            </div>

            <div className="job-footer-modern d-flex justify-content-between align-items-center mt-4 pt-3">
              <span className="posted-date-text">Posted: 10/01/2026</span>
              <span className="salary-tag-modern">£24,000 - £26,000</span>
            </div>
          </div>

            {/* Job Card: Care Coordinator */}
            <div className="job-card-premium p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div className="d-flex align-items-center">
                <div className="job-icon-box-modern me-3">
                    <i className="fa-solid fa-briefcase"></i>
                </div>
                <div>
                    <h4 className="fw-bold mb-1 job-title-text">Care Coordinator</h4>
                    <div className="job-meta-modern d-flex flex-wrap gap-3 text-muted">
                    <span><i className="fa-solid fa-location-dot me-1"></i> Hillside Care Home</span>
                    <span><i className="fa-solid fa-clock me-1"></i> Full-time</span>
                    <span><i className="fa-solid fa-users me-1"></i> 8 applicants</span>
                    </div>
                </div>
                </div>
                <div className="d-flex gap-2">
                <button className="btn btn-primary-modern">View Applications</button>
                <button className="btn btn-outline-modern">Edit Posting</button>
                </div>
            </div>

            <div className="job-body mt-4">
                <p className="text-secondary description-text">
                Exciting opportunity for a Care Coordinator to oversee our Hillside location. You will manage rotas, coordinate care plans, and support the management team.
                </p>
                
                <div className="requirements-box mt-4">
                <p className="req-header-text">REQUIREMENTS</p>
                <ul className="req-list-modern">
                    <li>Level 5 Diploma or equivalent</li>
                    <li>Care coordination experience</li>
                    <li>Strong organizational skills</li>
                    <li>Proficient in care management software</li>
                </ul>
                </div>
            </div>

            <div className="job-footer-modern d-flex justify-content-between align-items-center mt-4 pt-3">
                <span className="posted-date-text">Posted: 08/01/2026</span>
                <span className="salary-tag-modern">£28,000 - £32,000</span>
            </div>
            </div>

            {/* Job Card: Healthcare Assistant */}
            <div className="job-card-premium p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div className="d-flex align-items-center">
                <div className="job-icon-box-modern me-3">
                    <i className="fa-solid fa-briefcase"></i>
                </div>
                <div>
                    <h4 className="fw-bold mb-1 job-title-text">Healthcare Assistant</h4>
                    <div className="job-meta-modern d-flex flex-wrap gap-3 text-muted">
                    <span><i className="fa-solid fa-location-dot me-1"></i> Oakwood Care Home</span>
                    <span><i className="fa-solid fa-clock me-1"></i> Part-time</span>
                    <span><i className="fa-solid fa-users me-1"></i> 15 applicants</span>
                    </div>
                </div>
                </div>
                <div className="d-flex gap-2">
                <button className="btn btn-primary-modern">View Applications</button>
                <button className="btn btn-outline-modern">Edit Posting</button>
                </div>
            </div>

            <div className="job-body mt-4">
                <p className="text-secondary description-text">
                Join our compassionate team at Oakwood as a Healthcare Assistant. Perfect for those starting their care career or looking for flexible hours to support residents with daily activities.
                </p>
                
                <div className="requirements-box mt-4">
                <p className="req-header-text">REQUIREMENTS</p>
                <ul className="req-list-modern">
                    <li>Care Certificate or willingness to complete</li>
                    <li>Compassionate and patient nature</li>
                    <li>Good communication skills</li>
                    <li>Ability to work flexible shifts (including weekends)</li>
                </ul>
                </div>
            </div>

            <div className="job-footer-modern d-flex justify-content-between align-items-center mt-4 pt-3">
                <span className="posted-date-text">Posted: 12/01/2026</span>
                <span className="salary-tag-modern">£11.50 - £12.50 per hour</span>
            </div>
            </div>


        </div>
      </div>
    )
  }
}

export default Jobs;
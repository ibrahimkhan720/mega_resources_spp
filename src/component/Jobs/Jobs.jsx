"use client"

import Link from 'next/link';
import React, { Component } from 'react'
import { getjob } from "../../Api/JobOpiningapi"

export class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchJobData();
  }

  fetchJobData = async () => {
    try {
      const response = await getjob();
      this.setState({ jobs: response.info || [], loading: false });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { jobs, loading } = this.state;

    return (
      <div className="jobs-page-container pt-5">
        <div className="container main-wrapper">
          
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
              { label: 'Open Positions', count: jobs.length, color: 'blue' },
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

          {jobs.map((job, index) => (
            <div className="job-card-premium p-4 mb-4" key={job.id || index}>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div className="d-flex align-items-center">
                  <div className="job-icon-box-modern me-3">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1 job-title-text">{job.title}</h4>
                    <div className="job-meta-modern d-flex flex-wrap gap-3 text-muted">
                      <span><i className="fa-solid fa-location-dot me-1"></i> Branch {job.branch?.name}</span>
                      <span><i className="fa-solid fa-clock me-1"></i> {job.type}</span>
                    </div>
                  </div>
                </div>
                {/* <div className="d-flex gap-2">
                  <button className="btn btn-primary-modern">View Applications</button>
                </div> */}
              </div>

              <div className="job-body mt-4">
                <p className="text-secondary description-text">
                  {job.description}
                </p>
                
                <div className="requirements-box mt-4">
                  <p className="req-header-text">REQUIREMENTS</p>
                  <ul className="req-list-modern">
                    {(() => {
                      try {
                        // Agar requirements string hai toh parse karo, warna wahi array use karo
                        const reqs = typeof job.requirements === 'string' 
                          ? JSON.parse(job.requirements) 
                          : job.requirements;

                        return Array.isArray(reqs) 
                          ? reqs.map((req, i) => <li key={i}>{req}</li>)
                          : <li>No requirements listed</li>;
                      } catch (e) {
                        return <li>{job.requirements}</li>; 
                      }
                    })()}
                  </ul>
                </div>
              </div>

              <div className="job-footer-modern d-flex justify-content-between align-items-center mt-4 pt-3">
                <div className='d-flex gap-4'>
                  <span className="posted-date-text">
                  Posted: {job.posted_date ? new Date(job.posted_date).toLocaleDateString() : 'N/A'}
                </span>
                 <span className="posted-date-text">
                  closed: {job.closing_date ? new Date(job.closing_date).toLocaleDateString() : 'N/A'}
                </span>
                </div>
                <span className="salary-tag-modern">{job.salary}</span>
              </div>
              
            </div>
          ))}

        

        </div>
      </div>
    )
  }
}

export default Jobs;
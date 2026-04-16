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

          {loading ? (
            /* Job Card Skeleton Loop */
            [...Array(3)].map((_, i) => (
              <div className="job-card-premium p-4 mb-4" key={i}>
                <div className="d-flex align-items-center mb-4">
                  <div className="skeleton me-3" style={{ width: '50px', height: '50px', borderRadius: '10px' }}></div>
                  <div className="w-100">
                    <div className="skeleton skeleton-text w-50 mb-2" style={{ height: '24px' }}></div>
                    <div className="skeleton skeleton-text w-25"></div>
                  </div>
                </div>
                <div className="skeleton skeleton-text w-100 mb-2"></div>
                <div className="skeleton skeleton-text w-100 mb-2"></div>
                <div className="skeleton skeleton-text w-75 mb-4"></div>
                <div className="skeleton w-100" style={{ height: '100px', borderRadius: '8px' }}></div>
              </div>
            ))
          ) : (
            /* Actual Job Cards */
            jobs.map((job, index) => (
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
                      Closed: {job.closing_date ? new Date(job.closing_date).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <span className="salary-tag-modern">{job.salary}</span>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    )
  }
}

export default Jobs;
"use client"

import Link from 'next/link';
import React, { Component } from 'react';
import { getorganisational } from "../../Api/OrganisationalChartapi";

export class Organisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegionalOpen: true,
      isCareOpen: true,
      isHROpen: true,
      staffData: [],
      loading: true, // Loading state add ki
    };
  }

  async componentDidMount() {
    try {
      const response = await getorganisational();
      if (response && response.info) {
        this.setState({ staffData: response.info, loading: false });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("API Error:", error);
      this.setState({ loading: false });
    }
  }

  toggleSection = (sectionName) => {
    this.setState({ [sectionName]: !this.state[sectionName] });
  }

  render() {
    const { staffData, isRegionalOpen, isCareOpen, isHROpen, loading } = this.state;

    const ceo = staffData.find(s => s.position_id == 7); 
    const leadership = staffData.filter(s => s.management_id == 2 && s.position_id != 7); 
    const regionalManagers = staffData.filter(s => s.management_id == 3);
    const careStaff = staffData.filter(s => s.management_id == 4);
    const hrTeam = staffData.filter(s => s.management_id == 5);

    return (
      <div className="org-page-container pt-5">
        <div className="container">
          
          <div className="mb-4">
            <Link href="/" className="back-link text-decoration-none text-dark">
              <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
            </Link>
          </div>

          <div className="mb-5">
            <h2 className="fw-bold mb-2 main-title">Organisation Chart</h2>
            <p className="text-muted sub-title">MEGA CARELINE company structure and hierarchy</p>
          </div>

          {/* TOP STATS CARDS */}
          <div className="row g-4 mb-5">
            {[
              { label: 'Total Staff', count: loading ? '' : staffData.length, color: '#2563eb' },
              { label: 'Leadership', count: loading ? '' : leadership.length + (ceo ? 1 : 0), color: '#f97316' },
              { label: 'Managers', count: loading ? '' : regionalManagers.length, color: '#2563eb' },
              { label: 'Care Team', count: loading ? '' : careStaff.length, color: '#f97316' }
            ].map((stat, i) => (
              <div className="col-md-3" key={i}>
                <div className="stat-card p-4 shadow-sm border-0 text-center bg-white" style={{borderRadius: '12px'}}>
                  {loading ? (
                    <div className="skeleton mx-auto mb-2" style={{ height: '30px', width: '40px' }}></div>
                  ) : (
                    <h3 className="fw-bold mb-1" style={{ color: stat.color }}>{stat.count}</h3>
                  )}
                  <div className="text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem', letterSpacing: '0.05em'}}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CEO Section */}
          {loading ? (
            <div className="skeleton p-5 mb-5 shadow-sm d-flex align-items-center" style={{ borderRadius: '15px', height: '180px' }}></div>
          ) : (
            ceo && (
              <div className="ceo-banner p-5 mb-5 shadow-sm d-flex align-items-center">
                <div className="ceo-avatar-circle me-4">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div className="text-white">
                  <p className="text-uppercase fw-bold mb-2 op-7">{ceo.position?.title}</p>
                  <h2 className="fw-bold mb-3 text-white">{ceo.name}</h2>
                  <div className="d-flex flex-wrap gap-4 contact-row">
                    <span><i className="fa-solid fa-phone me-2 opacity-75"></i> {ceo.number}</span>
                    <span><i className="fa-solid fa-envelope me-2 opacity-75"></i> {ceo.email}</span>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Senior Leadership */}
          <div className="section-head mb-4 px-2">
            <i className="fa-solid fa-user-group me-2 text-primary"></i> Senior Leadership
          </div>
          <div className="row g-4 mb-5">
            {loading ? (
              [...Array(2)].map((_, i) => (
                <div className="col-md-6" key={i}>
                  <div className="skeleton p-4 shadow-sm" style={{ borderRadius: '12px', height: '160px' }}></div>
                </div>
              ))
            ) : (
              leadership.map((lead, i) => (
                <div className="col-md-6" key={i}>
                  <div className="member-card leadership p-4 shadow-sm">
                    <p className="role-tag text-primary text-uppercase fw-bold">{lead.position?.title}</p>
                    <h5 className="fw-bold mb-3">{lead.name}</h5>
                    <div className="member-meta mb-3 text-muted small">
                      <div className="mb-1"><i className="fa-solid fa-phone me-2"></i> {lead.number}</div>
                      <div><i className="fa-solid fa-envelope me-2"></i> {lead.email}</div>
                    </div>
                    <div className="text-muted small fw-bold">Reports To: {lead.report_to?.title}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Regional Managers Section */}
          <div className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1 clickable-header"
            onClick={() => this.toggleSection('isRegionalOpen')} style={{ cursor: 'pointer' }}>
             <span><i className="fa-solid fa-briefcase me-2 text-purple"></i> Regional Managers</span>
             <i className={`fa-solid ${isRegionalOpen ? 'fa-chevron-up' : 'fa-chevron-down'} opacity-50`}></i>
          </div>
          <div className={`collapsible-content ${isRegionalOpen ? 'show' : 'hide'}`}>
             <div className="mb-5 px-1">
                {loading ? (
                  <div className="skeleton w-100 mb-3" style={{ height: '100px', borderRadius: '12px' }}></div>
                ) : (
                  regionalManagers.map((m, i) => (
                    <div className="member-card regional p-4 mb-3 shadow-sm d-flex justify-content-between align-items-center" key={i}>
                      <div>
                        <p className="role-tag text-purple text-uppercase fw-bold">{m.position?.title}</p>
                        <h6 className="fw-bold mb-1">{m.name}</h6>
                        <div className="member-meta-row d-flex flex-wrap gap-4 small text-muted mt-2">
                          <span><i className="fa-solid fa-phone me-2"></i> {m.number}</span>
                          <span><i className="fa-solid fa-envelope me-2"></i> {m.email}</span>
                        </div>
                        <div className="text-muted small mt-2">Reports To: {m.report_to?.title}</div>
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>

          {/* Care Team Section */}
          <div className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1 clickable-header"
            onClick={() => this.toggleSection('isCareOpen')} style={{ cursor: 'pointer' }}>
             <span><i className="fa-solid fa-hand-holding-heart me-2 text-orange"></i> Care Team</span>
             <i className={`fa-solid ${isCareOpen ? 'fa-chevron-up' : 'fa-chevron-down'} opacity-50`}></i>
          </div>
          <div className={`collapsible-content ${isCareOpen ? 'show' : 'hide'}`}>
             <div className="mb-5 px-1">
                {loading ? (
                  <div className="skeleton w-100 mb-3" style={{ height: '100px', borderRadius: '12px' }}></div>
                ) : (
                  careStaff.map((staff, i) => (
                    <div className="member-card coordinator p-4 mb-3 shadow-sm d-flex justify-content-between align-items-center" key={i}>
                      <div>
                        <p className="role-tag text-orange text-uppercase fw-bold">{staff.position?.title}</p>
                        <h6 className="fw-bold mb-1">{staff.name}</h6>
                        <div className="member-meta-row d-flex gap-4 small text-muted mt-2">
                           <span><i className="fa-solid fa-phone me-2"></i> {staff.number}</span>
                           <span><i className="fa-solid fa-envelope me-2"></i> {staff.email}</span>
                        </div>
                        <div className="text-muted small mt-2">Reports To: {staff.report_to?.title}</div>
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>

          {/* HR Team Section */}
          <div className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1 clickable-header"
            onClick={() => this.toggleSection('isHROpen')} style={{ cursor: 'pointer' }}>
             <span><i className="fa-solid fa-address-card me-2 text-green"></i> HR Team</span>
             <i className={`fa-solid ${isHROpen ? 'fa-chevron-up' : 'fa-chevron-down'} opacity-50`}></i>
          </div>
          <div className={`collapsible-content ${isHROpen ? 'show' : 'hide'}`}>
            <div className="mb-5 px-1">
               {loading ? (
                 <div className="skeleton w-100 mb-3" style={{ height: '100px', borderRadius: '12px' }}></div>
               ) : (
                 hrTeam.map((hr, i) => (
                  <div className="member-card hr p-4 mb-3 shadow-sm d-flex justify-content-between align-items-center" key={i}>
                    <div>
                        <p className="role-tag text-green text-uppercase fw-bold">{hr.position?.title}</p>
                        <h6 className="fw-bold mb-1">{hr.name}</h6>
                        <div className="member-meta-row d-flex gap-4 mt-3 small text-muted">
                          <span><i className="fa-solid fa-phone me-2"></i> {hr.number}</span>
                          <span><i className="fa-solid fa-envelope me-2"></i> {hr.email}</span>
                        </div>
                        <div className="text-muted small mt-2">Reports To: {hr.report_to?.title}</div>
                    </div>
                  </div>
                 ))
               )}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Organisation;
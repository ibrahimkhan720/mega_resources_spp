"use client"

import Link from 'next/link';
import React, { Component } from 'react'


export class Organisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegionalOpen: true,
      isCareOpen: true,
      isHROpen: true
    };
  }

  // Toggle function
  toggleSection = (sectionName) => {
    this.setState({
      [sectionName]: !this.state[sectionName]
    });
  }

  render() {
    return (
      <div className="org-page-container pt-5">
        <div className="container">
          
          {/* Back link */}
          <div className="mb-4">
            <Link href="/" className="back-link text-decoration-none text-dark">
              <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
            </Link>
          </div>

          {/* Header */}
          <div className="mb-5">
            <h2 className="fw-bold mb-2 main-title">Organisation Chart</h2>
            <p className="text-muted sub-title">MEGA CARELINE company structure and hierarchy</p>
          </div>

          {/* 1. Statistics Row */}
          <div className="row g-4 mb-5">
            {[
              { label: 'Total Staff', count: '85', color: '#2563eb' },
              { label: 'Care Locations', count: '3', color: '#2563eb' },
              { label: 'Managers', count: '12', color: '#2563eb' },
              { label: 'Coordinators', count: '9', color: '#a855f7' },
              { label: 'Care Staff', count: '64', color: '#f97316' }
            ].map((stat, i) => (
              <div className="col" key={i}>
                <div className="stat-card p-4 shadow-sm border-0 text-center bg-white">
                  <h3 className="fw-bold mb-1" style={{ color: stat.color }}>{stat.count}</h3>
                  <div className="text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem', letterSpacing: '0.05em'}}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. CEO Section */}
          <div className="ceo-banner p-5 mb-5 shadow-sm d-flex align-items-center">
            <div className="ceo-avatar-circle me-4">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <div className="text-white">
              <p className="text-uppercase fw-bold mb-2 op-7">CHIEF EXECUTIVE OFFICER</p>
              <h2 className="fw-bold mb-3 text-white">Sarah Williams</h2>
              <div className="d-flex flex-wrap gap-4 contact-row">
                <span><i className="fa-solid fa-phone me-2 opacity-75"></i> 07700 900123</span>
                <span><i className="fa-solid fa-envelope me-2 opacity-75"></i> s.williams@megacareline.com</span>
              </div>
            </div>
          </div>

          {/* 3. Senior Leadership */}
          <div className="section-head mb-4 px-2"><i className="fa-solid fa-user-group me-2 text-primary"></i> Senior Leadership</div>
          <div className="row g-4 mb-5">
            {[{role: 'OPERATIONS DIRECTOR', name: 'James Patterson', reports: '45'}, {role: 'HR DIRECTOR', name: 'Rachel Green', reports: '8'}].map((lead, i) => (
              <div className="col-md-6" key={i}>
                <div className="member-card leadership p-4 shadow-sm">
                  <p className="role-tag text-primary">{lead.role}</p>
                  <h5 className="fw-bold mb-3">{lead.name}</h5>
                  <div className="member-meta mb-3 text-muted small">
                    <div className="mb-1"><i className="fa-solid fa-phone me-2"></i> 07700 900124</div>
                    <div><i className="fa-solid fa-envelope me-2"></i> {lead.name.toLowerCase().split(' ')[0]}@megacareline.com</div>
                  </div>
                  <span className="reports-badge mt-2"><i className="fa-solid fa-users me-2"></i>{lead.reports} direct reports</span>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Regional Managers (TOGGLEABLE) */}
          <div 
            className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1 clickable-header"
            onClick={() => this.toggleSection('isRegionalOpen')}
            style={{ cursor: 'pointer' }}
          >
             <span><i className="fa-solid fa-briefcase me-2 text-purple"></i> Regional Managers</span>
             <i className={`fa-solid ${this.state.isRegionalOpen ? 'fa-chevron-up' : 'fa-chevron-down'} opacity-50`}></i>
          </div>
          
          <div className={`collapsible-content ${this.state.isRegionalOpen ? 'show' : 'hide'}`}>
             <div className="mb-5 px-1">
                {['Alex Thompson', 'Emma Roberts', 'David Martinez'].map((name, i) => (
                   <div className="member-card regional p-4 mb-3 shadow-sm d-flex justify-content-between align-items-center" key={i}>
                     <div>
                       <p className="role-tag text-purple">REGIONAL MANAGER</p>
                       <h6 className="fw-bold mb-1">{name}</h6>
                       <small className="text-muted d-block mb-3 fw-medium">{i===0 ? 'Croxes' : i===1 ? 'Hillside' : 'Riverside'}</small>
                       <div className="member-meta-row d-flex flex-wrap gap-4 small text-muted">
                          <span><i className="fa-solid fa-phone me-2"></i> 07700 90012{6+i}</span>
                          <span><i className="fa-solid fa-envelope me-2"></i> {name.toLowerCase().replace(' ', '.')}@megacareline.com</span>
                       </div>
                     </div>
                     {/* Yahan design change kar diya: Circle hata kar icon aur number laga diya */}
                     <div className="text-muted small fw-bold px-2">
                       <i className="fa-solid fa-users me-1"></i> {12+(i*3)}
                     </div>
                   </div>
                ))}
             </div>
          </div>

          {/* 5. Care Coordinators Section (TOGGLEABLE) */}
          <div 
            className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1 clickable-header"
            onClick={() => this.toggleSection('isCareOpen')}
            style={{ cursor: 'pointer' }}
          >
             <span><i className="fa-solid fa-hand-holding-heart me-2 text-orange"></i> Care Coordinators & Senior Carers</span>
             <i className={`fa-solid ${this.state.isCareOpen ? 'fa-chevron-up' : 'fa-chevron-down'} opacity-50`}></i>
          </div>
          
          <div className={`collapsible-content ${this.state.isCareOpen ? 'show' : 'hide'}`}>
             <div className="mb-5 px-1">
                {['Camryn Davis', 'Bryan Wilson', 'Michael Brown'].map((name, i) => (
                  <div className={`member-card ${i%2===0 ? 'coordinator' : 'senior-carer'} p-4 mb-3 shadow-sm d-flex justify-content-between`} key={i}>
                     <div>
                        <p className="role-tag text-orange">{i%2===0 ? 'CARE COORDINATOR' : 'SENIOR CARER'}</p>
                        <h6 className="fw-bold mb-1">{name}</h6>
                        <small className="text-muted d-block mb-3">Location Managed</small>
                        <div className="member-meta-row d-flex gap-4 small text-muted">
                           <span><i className="fa-solid fa-phone me-2"></i> 07700 90012{9+i}</span>
                           <span><i className="fa-solid fa-envelope me-2"></i> {name.toLowerCase().charAt(0)}.name@careline.com</span>
                        </div>
                     </div>
                     <div className="text-muted small fw-bold px-2">
                       <i className="fa-solid fa-users me-1"></i> {6-i}
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* 6. HR Team (TOGGLEABLE) */}
          <div 
            className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1 clickable-header"
            onClick={() => this.toggleSection('isHROpen')}
            style={{ cursor: 'pointer' }}
          >
             <span><i className="fa-solid fa-address-card me-2 text-green"></i> HR Team</span>
             <i className={`fa-solid ${this.state.isHROpen ? 'fa-chevron-up' : 'fa-chevron-down'} opacity-50`}></i>
          </div>
          
          <div className={`collapsible-content ${this.state.isHROpen ? 'show' : 'hide'}`}>
            <div className="mb-5 px-1">
               <div className="member-card hr p-4 shadow-sm d-flex justify-content-between">
                  <div>
                     <p className="role-tag text-green">HR MANAGER</p>
                     <h6 className="fw-bold mb-1">John Smith</h6>
                     <div className="member-meta-row d-flex gap-4 mt-3 small text-muted">
                        <span><i className="fa-solid fa-phone me-2"></i> 07700 900135</span>
                        <span><i className="fa-solid fa-envelope me-2"></i> j.smith@megacareline.com</span>
                     </div>
                  </div>
                  <div className="text-muted small fw-bold"><i className="fa-solid fa-users me-1"></i> 3</div>
               </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Organisation
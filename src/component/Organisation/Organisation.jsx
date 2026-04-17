"use client"

import Link from 'next/link';
import React, { Component } from 'react';
import { getorganisational } from "../../Api/OrganisationalChartapi";

export class Organisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffData: [],
      loading: true,
      openSections: {}, 
    };
  }

  async componentDidMount() {
    try {
      const response = await getorganisational();
      if (response && response.info) {
        const initialOpenState = {};
        response.info.forEach(item => {
          if (item.management_id) initialOpenState[item.management_id] = true;
        });

        this.setState({ 
          staffData: response.info, 
          loading: false,
          openSections: initialOpenState 
        });
      } else {
        this.setState({ loading: false, staffData: [] });
      }
    } catch (error) {
      console.error("API Error:", error);
      this.setState({ loading: false, staffData: [] });
    }
  }

  toggleSection = (id) => {
    this.setState(prevState => ({
      openSections: {
        ...prevState.openSections,
        [id]: !prevState.openSections[id]
      }
    }));
  }

  // --- EXACT DESIGN SKELETON (MANUAL BLOCKS) ---
  renderSkeleton = () => (
    <div className="skeleton-container animate-pulse">
      {/* 1. Stats Skeleton */}
      <div className="row g-4 mb-5">
        <div className="col-md-3"><div className="p-4 bg-white shadow-sm" style={{ borderRadius: '12px', height: '104px', borderBottom: '4px solid #e2e8f0' }}></div></div>
        <div className="col-md-3"><div className="p-4 bg-white shadow-sm" style={{ borderRadius: '12px', height: '104px', borderBottom: '4px solid #e2e8f0' }}></div></div>
        <div className="col-md-3"><div className="p-4 bg-white shadow-sm" style={{ borderRadius: '12px', height: '104px', borderBottom: '4px solid #e2e8f0' }}></div></div>
        <div className="col-md-3"><div className="p-4 bg-white shadow-sm" style={{ borderRadius: '12px', height: '104px', borderBottom: '4px solid #e2e8f0' }}></div></div>
      </div>

      {/* 2. CEO Banner Skeleton */}
      <div className="p-5 mb-5 shadow-sm" style={{ backgroundColor: '#e2e8f0', borderRadius: '15px', height: '210px' }}></div>

      {/* 3. Leadership Grid Skeleton */}
      <div className="row g-4 mb-5">
        <div className="col-md-6"><div className="p-4 bg-white shadow-sm" style={{ borderRadius: '12px', height: '165px', borderLeft: '4px solid #e2e8f0' }}></div></div>
        <div className="col-md-6"><div className="p-4 bg-white shadow-sm" style={{ borderRadius: '12px', height: '165px', borderLeft: '4px solid #e2e8f0' }}></div></div>
      </div>
    </div>
  );

  render() {
    const { staffData, loading, openSections } = this.state;

    if (loading) return (
      <div className="org-page-container pt-5">
        <div className="container">
          <h2 className="fw-bold mb-4">Organisation Chart</h2>
          {this.renderSkeleton()}
          <style jsx>{`
            .animate-pulse { animation: pulse 1.5s infinite; }
            @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
          `}</style>
        </div>
      </div>
    );

    // --- LOGICS ---
    const ceo = staffData.find(s => s.management_id == 6) || staffData.find(s => !s.report_to);
    const leadership = staffData.filter(s => s.management_id == 2);
    
    const otherGroups = staffData.reduce((acc, item) => {
      if (item.management_id == 6 || item.management_id == 2) return acc;
      const mId = item.management_id;
      if (!acc[mId]) {
        acc[mId] = {
          title: item.management?.title || "Department",
          icon: item.management?.icons || "bi-people",
          members: []
        };
      }
      acc[mId].members.push(item);
      return acc;
    }, {});

    return (
      <div className="org-page-container pt-5">
        <div className="container">
          
          <div className="mb-4">
            <Link href="/" className="back-link text-decoration-none text-dark">
              <i className="bi bi-arrow-left me-2" style={{ color: '#2563eb' }}></i> Back to Dashboard
            </Link>
          </div>

          <div className="mb-5">
            <h2 className="fw-bold mb-2 main-title">Organisation Chart</h2>
            <p className="text-muted sub-title">MEGA CARELINE company structure and hierarchy</p>
          </div>

          {/* 1. TOP STATS CARDS */}
          <div className="row g-4 mb-5">
            {[
              { label: 'Total Staff', count: staffData.length },
              { label: 'Leadership', count: leadership.length },
              { label: 'Managers', count: staffData.filter(s => s.management_id == 3).length },
              { label: 'Care Team', count: staffData.filter(s => s.management_id == 4).length }
            ].map((stat, i) => (
              <div className="col-md-3" key={i}>
                <div className="stat-card p-4 shadow-sm border-0 text-center bg-white" style={{borderRadius: '12px'}}>
                  <h3 className="fw-bold mb-1" style={{ color: '#2563eb' }}>{stat.count}</h3>
                  <div className="text-muted small fw-bold text-uppercase" style={{fontSize: '0.65rem'}}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. CEO Section */}
          {ceo && (
            <div className="ceo-banner p-5 mb-5 shadow-sm d-flex align-items-center" style={{ backgroundColor: '#2563eb', borderRadius: '15px' }}>
              <div className="ceo-avatar-circle me-4 bg-white d-flex align-items-center justify-content-center" 
                   style={{ width: '75px', height: '75px', borderRadius: '50%', color: '#2563eb', fontSize: '2rem' }}>
                <i className={`${ceo.management?.icons || 'bi-person-badge-fill'}`}></i>
              </div>
              <div className="text-white">
                <p className="text-uppercase fw-bold mb-2 opacity-75 small">{ceo.position?.title}</p>
                <h2 className="fw-bold mb-3 text-white">{ceo.name}</h2>
                <div className="d-flex flex-wrap gap-4">
                  {ceo.number && (
                    <span><i className="bi bi-telephone-fill me-2"></i> {ceo.number}</span>
                  )}
                  {ceo.email && (
                    <span><i className="bi bi-envelope-fill me-2"></i> {ceo.email}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3. Leadership Section (FIXED LINE 132-133) */}
          {leadership.length > 0 && (
            <div className="mb-5">
              <div className="section-head mb-4 px-2 fw-bold">
                {/* Yahan leadership lagaya hai kyunki leadership ek array hai */}
                <i className={`bi ${leadership?.management?.icons || 'bi-people'} me-2`} style={{ color: '#2563eb' }}></i> 
                {leadership?.management?.title || "Senior Leadership"}
              </div>
              
              <div className="row g-4">
                {leadership.map((lead, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="member-card p-4 shadow-sm bg-white" style={{ borderRadius: '12px', borderLeft: '4px solid #2563eb' }}>
                      <p className="text-primary text-uppercase fw-bold small mb-1">{lead.position?.title}</p>
                      <h5 className="fw-bold mb-3">{lead.name}</h5>
                      <div className="member-meta mb-3 text-muted small">
                        {lead.number && (
                          <div className="mb-1"><i className="bi bi-telephone me-2" style={{ color: '#2563eb' }}></i> {lead.number}</div>
                        )}
                        {lead.email && (
                          <div><i className="bi bi-envelope me-2" style={{ color: '#2563eb' }}></i> {lead.email}</div>
                        )}
                      </div>
                      <div className="text-muted small fw-bold pt-2 border-top">Reports To: {ceo?.name || "CEO"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. DYNAMIC DROPDOWNS */}
          {Object.keys(otherGroups).map((mId) => {
            const section = otherGroups[mId];
            return (
              <div key={mId} className="mb-4">
                <div 
                  className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1"
                  onClick={() => this.toggleSection(mId)}
                  style={{ cursor: 'pointer', padding: '15px', borderRadius: '10px', backgroundColor: '#ffffff' }}
                >
                  <span className="fw-bold">
                    <i className={`${section.icon} me-2`} style={{ color: '#2563eb' }}></i> 
                    {section.title}
                  </span>
                  <i className={`bi ${openSections[mId] ? 'bi-chevron-up' : 'bi-chevron-down'}`} style={{ color: '#2563eb' }}></i>
                </div>
                
                {openSections[mId] && (
                  <div className="mb-5 px-1">
                    {section.members.map((m, i) => (
                      <div className="member-card p-4 mb-3 shadow-sm d-flex justify-content-between align-items-center bg-white" 
                           style={{borderRadius: '12px', borderLeft: '5px solid #2563eb'}} key={i}>
                        <div>
                          <p className="text-primary text-uppercase fw-bold small mb-1">{m.position?.title}</p>
                          <h6 className="fw-bold mb-1">{m.name}</h6>
                          <div className="d-flex flex-wrap gap-4 small text-muted mt-2">
                            {m.number && <span><i className="bi bi-telephone me-2" style={{ color: '#2563eb' }}></i> {m.number}</span>}
                            {m.email && <span><i className="bi bi-envelope me-2" style={{ color: '#2563eb' }}></i> {m.email}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Organisation;
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
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("API Error:", error);
      this.setState({ loading: false });
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

  render() {
    const { staffData, loading, openSections } = this.state;

    if (loading) return <div className="text-center pt-5">Loading Chart...</div>;

    // 1. CEO/Top Level find karein (Jiska report_to null hai)
    const ceo = staffData.find(s => !s.report_to);

    // 2. Baki sab ko Management ID ke hisab se Group karein (Dynamic Logic)
    // Ye line kal ko 100 naye management types ko bhi handle kar legi
    const groupedData = staffData.reduce((acc, item) => {
      if (item.id === ceo?.id) return acc; // CEO ko list se nikal do kyunki wo top banner mein hai
      
      const mId = item.management_id;
      if (!acc[mId]) {
        acc[mId] = {
          title: item.management?.title || "Staff Members",
          icon: item.management?.icons || "fa-users",
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
              <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
            </Link>
          </div>

          <div className="mb-5">
            <h2 className="fw-bold mb-2 main-title">Organisation Chart</h2>
            <p className="text-muted sub-title">MEGA CARELINE company structure and hierarchy</p>
          </div>

          {/* CEO / TOP BANNER */}
          {ceo && (
            <div className="ceo-banner p-5 mb-5 shadow-sm d-flex align-items-center">
              <div className="ceo-avatar-circle me-4">
                <i className={`fa-solid ${ceo.management?.icons || 'fa-user-tie'}`}></i>
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
          )}

          {/* DYNAMIC SECTIONS (Auto-generated from Backend) */}
          {Object.keys(groupedData).map((mId) => {
            const section = groupedData[mId];
            return (
              <div key={mId} className="mb-4">
                <div 
                  className="dropdown-section mb-3 d-flex justify-content-between align-items-center shadow-sm mx-1 clickable-header"
                  onClick={() => this.toggleSection(mId)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="fw-bold">
                    <i className={`fa-solid ${section.icon} me-2 text-primary`}></i> 
                    {section.title}
                  </span>
                  <i className={`fa-solid ${openSections[mId] ? 'fa-chevron-up' : 'fa-chevron-down'} opacity-50`}></i>
                </div>
                
                {openSections[mId] && (
                  <div className="row g-4 px-1 mb-5">
                    {section.members.map((m, i) => (
                      <div className="col-md-6" key={i}>
                        <div className="member-card p-4 shadow-sm bg-white" style={{borderRadius: '12px', borderLeft: '5px solid #2563eb'}}>
                          <p className="role-tag text-primary text-uppercase fw-bold mb-2" style={{fontSize: '0.75rem'}}>
                            {m.position?.title}
                          </p>
                          <h5 className="fw-bold mb-3">{m.name}</h5>
                          <div className="member-meta-row mb-3 text-muted small">
                            <div className="mb-1"><i className="fa-solid fa-phone me-2"></i> {m.number}</div>
                            <div><i className="fa-solid fa-envelope me-2"></i> {m.email}</div>
                          </div>
                          <div className="text-muted small fw-bold pt-2 border-top">
                            Reports To: {m.report_to?.name || ceo?.name || 'Director'}
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
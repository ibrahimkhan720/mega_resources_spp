"use client"

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDownload } from '@fortawesome/free-solid-svg-icons'
import { getPolicies } from "../../Api/Policiesapi" 
import { POLICY_FILE_URL } from "../../utility/policiesimage" 

const Mega_Olympics = () => {
  const [policies, setPolicies] = useState([]);

  const meetings = [
  { id: 1, day: "30", month: "DEC", weekday: "WED", title: "Staff Meeting 1", time: "09:30am" },
  { id: 2, day: "31", month: "DEC", weekday: "THU", title: "Staff Meeting 2", time: "10:30am" },
  { id: 3, day: "01", month: "JAN", weekday: "FRI", title: "Project Update", time: "11:00am" },
];

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await getPolicies();
        if (data && data.success) {
          setPolicies(data.info);
        }
      } catch (error) {
        console.error("Data fetch error:", error);
      } 
    };
    fetchPolicies();
  }, []);

  const handleDownload = (filePath, displayTitle) => {
    const fullUrl = `${POLICY_FILE_URL}${filePath}`;
    const link = document.createElement('a');
    link.href = fullUrl;
    link.target = "_blank"; 
    link.download = `${displayTitle}.pdf`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Common styling for scrollable cards
  const cardStyle = {
    height: "28rem",
    overflowY: "auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
  };

  const headerStyle = {
    position: "sticky",
    top: "0",
    backgroundColor: "#fff",
    zIndex: "10",
    paddingBottom: "15px",
    borderBottom: "2px solid #f8f9fa",
    marginBottom: "15px"
  };

  return (
    <div className="mega-container-wrapper" style={{ padding: "30px 6rem 0 !important" }}>
      
      <div className="mega-news-bar d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center ">
          <span className="news-label">NEWS</span>
          <span className="news-headline ml-2">Mega Olympics 2026 - Are you ready?</span>
        </div>
        <div className="news-end-dot"><FontAwesomeIcon icon={faCircle} /></div>
      </div>

      <div className="row g-4">
        
        <div className="col-lg-6">
          <div className="mega-card" style={cardStyle}>
            <div className="card-header-flex" style={headerStyle}>
              <h2 className="section-title m-0">Meetings</h2>
              <span className="header-dot"></span>
            </div>
            
           <div className="meetings-content">
              {meetings.map((item) => (
                <div key={item.id} className="meeting-row d-flex align-items-start mb-3 border-bottom pb-2">
                  <div className="date-box">
                    <div className="month">{item.weekday}</div>
                    <div className="day">{item.day}</div>
                    <div className="month">{item.month}</div>
                  </div>
                  <div className="meeting-text">
                    <h3 className="meeting-name">{item.title}</h3>
                    <p className="meeting-time">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="mega-card" style={cardStyle}>
            <div className="card-header-flex" style={headerStyle}>
              <h2 className="section-title m-0">Policies</h2>
              <span className="header-dot"></span>
            </div>

              <div className="policies-scroll-list">
                {policies.length > 0 && policies.map((item) => (
                  <div 
                    key={item.id} 
                    className="policy-item d-flex justify-content-between align-items-center p-3 mb-2 border rounded-pill"
                    style={{ cursor: 'pointer', transition: '0.3s', backgroundColor: '#fdfdfd' }}
                    onClick={() => handleDownload(item.file_path, item.title)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fdfdfd'}
                  >
                    <span style={{ fontWeight: '500' }}>{item.title}</span>
                    <FontAwesomeIcon icon={faDownload} style={{ color: '#0056b3' }} />
                  </div>
                ))}
              </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Mega_Olympics;
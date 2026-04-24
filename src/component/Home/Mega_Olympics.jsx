"use client"

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDownload } from '@fortawesome/free-solid-svg-icons'
import { getPolicies } from "../../Api/Policiesapi" 
import { getmeeting } from '@/Api/Meetingapi'
import { getannouncement } from '@/Api/Announcemenapi'
import { POLICY_FILE_URL } from "../../utility/policiesimage" 

const Mega_Olympics = () => {
  const [policies, setPolicies] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [policyRes, meetingRes, announceRes] = await Promise.all([
          getPolicies(),
          getmeeting(),
          getannouncement()
        ]);

        if (policyRes && policyRes.success) {
          setPolicies(policyRes.info || []);
        }

        if (meetingRes) {
          setMeetings(meetingRes.info || meetingRes.data || []);
        }

        if (announceRes && announceRes.success && Array.isArray(announceRes.info)) {
          if (announceRes.info.length > 0) {
            const latestItem = announceRes.info;
            const textToDisplay = latestItem[0].announcement_message;
            setAnnouncement(textToDisplay);
          } else {
            setAnnouncement("No updates available");
          }
        }

      } catch (error) {
        console.error("Data fetch error:", error);
        setAnnouncement("Failed to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const parseMeetingDate = (dateStr) => {
    if (!dateStr) return { day: '00', month: 'MMM', weekday: 'DAY' };
    const d = new Date(dateStr);
    return {
      day: d.getDate().toString().padStart(2, '0'),
      month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      weekday: d.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()
    };
  };

  const handleDownload = (filePath, displayTitle) => {
    const fullUrl = `${POLICY_FILE_URL}${filePath}`;
    window.open(fullUrl, '_blank');
  };

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
    <div className="mega-container-wrapper" >
      
      {/* News Bar */}
      <div className="mega-news-bar d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center overflow-hidden w-100">
          <span className="news-label">NEWS</span>
          {loading ? (
            <div className="skeleton skeleton-text w-50 ms-3"></div>
          ) : (
            <span className="news-headline">{announcement}</span>
          )}
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
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="meeting-row d-flex align-items-center mb-4 border-bottom pb-2">
                    <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '8px' }}></div>
                    <div className="ms-3 w-75">
                      <div className="skeleton skeleton-text mb-2" style={{ width: '80%' }}></div>
                      <div className="skeleton skeleton-text sm" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                ))
              ) : meetings.length > 0 ? (
                meetings.map((item) => {
                  const { day, month, weekday } = parseMeetingDate(item.date);
                  return (
                    <div key={item.id} className="meeting-row d-flex align-items-start mb-3 border-bottom pb-2">
                      <div className="date-box text-center" style={{ minWidth: '60px' }}>
                        <div className="month" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{weekday}</div>
                        <div className="day" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{day}</div>
                        <div className="month" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{month}</div>
                      </div>
                      <div className="meeting-text ms-3">
                        <h3 className="meeting-name" style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{item.subject}</h3>
                        <p className="meeting-time text-muted" style={{ fontSize: '0.9rem' }}>
                          {item.time} {item.location && `| ${item.location}`}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted text-center mt-4">No meetings scheduled</p>
              )}
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="col-lg-6">
          <div className="mega-card" style={cardStyle}>
            <div className="card-header-flex" style={headerStyle}>
              <h2 className="section-title m-0">Policies</h2>
              <span className="header-dot"></span>
            </div>

            <div className="policies-scroll-list">
              {loading ? (
                // Policies Skeleton Loader
                [...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton skeleton-btn mb-3"></div>
                ))
              ) : policies.length > 0 ? (
                policies.map((item) => (
                  <div
                    key={item.id}
                    className="policy-item d-flex justify-content-between align-items-center p-3 mb-2 border rounded-pill"
                    style={{ cursor: 'pointer', transition: '0.3s', backgroundColor: '#fdfdfd' }}
                    onClick={() => handleDownload(item.file_path, item.title)}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fdfdfd')}
                  >
                    <span style={{ fontWeight: '500' }}>{item.title}</span>
                    <FontAwesomeIcon icon={faDownload} style={{ color: '#0056b3' }} />
                  </div>
                ))
              ) : (
                <p className="text-muted text-center mt-4">No policies available</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Mega_Olympics;
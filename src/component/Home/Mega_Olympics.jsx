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
  const [announcement, setAnnouncement] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Policies Fetch
        const policyRes = await getPolicies();
        if (policyRes && policyRes.success) {
          setPolicies(policyRes.info || []);
        }

        // 2. Meetings Fetch
        const meetingRes = await getmeeting();
        if (meetingRes) {
          setMeetings(meetingRes.info || meetingRes.data || []);
        }

        // 3. Announcement Logic (Fixed)
        const announceRes = await getannouncement();
        if (announceRes && announceRes.success && Array.isArray(announceRes.info)) {
          if (announceRes.info.length > 0) {
            // Pehla record array se uthaya
            const latestItem = announceRes.info;
            // Message agar null ho to Title dikhaye
            const textToDisplay = latestItem.announcement_message || latestItem.announcement_title;
            setAnnouncement(textToDisplay || "Welcome to Mega Careline");
          } else {
            setAnnouncement("No updates available");
          }
        }

      } catch (error) {
        console.error("Data fetch error:", error);
        setAnnouncement("Failed to load news");
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

  // --- Styles (Aapka original design) ---
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
    <div className="mega-container-wrapper" style={{ padding: "30px 6rem 0" }}>
      
      {/* News Bar Design */}
      <div className="mega-news-bar d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center overflow-hidden">
          <span className="news-label">NEWS</span>
             <span className="news-headline">{announcement}</span>
        </div>
        <div className="news-end-dot"><FontAwesomeIcon icon={faCircle} /></div>
      </div>

      <div className="row g-4">
        {/* Meetings Section */}
        <div className="col-lg-6">
          <div className="mega-card" style={cardStyle}>
            <div className="card-header-flex" style={headerStyle}>
              <h2 className="section-title m-0">Meetings</h2>
              <span className="header-dot"></span>
            </div>
            
            <div className="meetings-content">
              {meetings.length > 0 ? (
                meetings.map((item) => {
                  const { day, month, weekday } = parseMeetingDate(item.date);
                  return (
                    <div key={item.id} className="meeting-row d-flex align-items-start mb-3 border-bottom pb-2">
                      <div className="date-box text-center" style={{ minWidth: '60px' }}>
                        <div className="month" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                          {weekday}
                        </div>
                        <div className="day" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                          {day}
                        </div>
                        <div className="month" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>
                          {month}
                        </div>
                      </div>
                      <div className="meeting-text ml-3">
                        <h3 className="meeting-name" style={{ fontSize: '1.1rem', marginBottom: '2px' }}>
                          {item.subject}
                        </h3>
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
              {policies.length > 0 ? (
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
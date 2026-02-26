"use client"

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import logoimage from "../../assets/images/5ffac5b492ec250053baf0085380433da86f99d5.png"
import Image from 'next/image'

const PalmTree = "🌴"; 
const Seedling = "🌱";

export class Annual_Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  // --- Background Scroll Control Logic ---
  componentDidUpdate(prevProps, prevState) {
    // Agar showModal change hua hai
    if (prevState.showModal !== this.state.showModal) {
      if (this.state.showModal) {
        // Jab modal open ho: body scroll band
        document.body.style.overflow = 'hidden';
      } else {
        // Jab modal close ho: body scroll wapas on
        document.body.style.overflow = 'unset';
      }
    }
  }

  // Component unmount hote waqt cleanup (zaroori hai taake doosre pages par masla na ho)
  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div className="annual-leave-container">
        <div className="leave-card shadow-sm">
          <h5 className="leave-title">Annual Leave</h5>
          
          <div className="leave-content-row">
            <div className="leave-stat-box">
              <span className="leave-icon-large">{PalmTree}</span>
              <div className="leave-info">
                <h2 className="leave-count">17.5</h2>
                <p className="leave-label">Available Annual Leave</p>
              </div>
            </div>

            <div className="leave-stat-box">
              <span className="leave-icon-large">{Seedling}</span>
              <div className="leave-info">
                <h2 className="leave-count">10.5</h2>
                <p className="leave-label">Annual Leave Taken</p>
              </div>
            </div>
          </div>

          <div className="leave-actions">
            <button className="request-btn" onClick={this.toggleModal}>
              <FontAwesomeIcon icon={faClock} className="me-2" />
              Request Time Off
            </button>
            <button className="calendar-icon-btn">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
          </div>
        </div>

        {/* --- ONE TEAM VISION BAR --- */}
        <div className="vision-bar-wrapper text-center">
            <Image 
                src={logoimage} 
                alt="One Team One Vision" 
                priority
                style={{ width: 'auto', height: 'auto', maxWidth: '70%' }}
            />
        </div>

        {/* --- POPUP MODAL --- */}
        {this.state.showModal && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-content">
              <div className="modal-header-row">
                <div className="d-flex align-items-center gap-2">
                   <FontAwesomeIcon icon={faCalendarAlt} className="text-primary" />
                   <h5 className="m-0 fw-bold">Request Annual Leave</h5>
                </div>
                <button className="close-x-btn" onClick={this.toggleModal}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <p className="modal-subtext">Fill out the form below to request time off. Your manager will be notified.</p>
              <div className="modal-body-form">
                <div className="form-group-custom"><label>Start Date</label><input type="date" className="form-control-custom" /></div>
                <div className="form-group-custom"><label>End Date</label><input type="date" className="form-control-custom" /></div>
                <div className="form-group-custom"><label>Reason for Leave</label><textarea className="form-control-custom" rows="3" placeholder='Please provide a brief reason for your leave request...'></textarea></div>
                <div className="form-group-custom"><label>Emergency Contact Number</label><input type="text" className="form-control-custom" placeholder='+44 7XXX XXXXXX' /></div>
              </div>
              <div className="modal-footer-row">
                <button className="btn-cancel-modal" onClick={this.toggleModal}>Cancel</button>
                <button className="btn-submit-modal">Submit Request</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Annual_Leave
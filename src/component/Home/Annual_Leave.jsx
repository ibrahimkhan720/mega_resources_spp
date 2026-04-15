"use client"

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import logoimage from "../../assets/images/5ffac5b492ec250053baf0085380433da86f99d5.png"
import Image from 'next/image'
import { annualleave } from "@/Api/AnnualLeavepi";

const PalmTree = "🌴"; 
const Seedling = "🌱";

export class Annual_Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      form: {
        leave_type: "fullday", // Default value
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        reason: "",
        emergency_number: ""
      },
      errors: {},
      successMessage: ""
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      },
      // Clear errors when user types
      errors: { ...this.state.errors, [name]: "" }
    });
  };
  
  toggleModal = () => {
    this.setState({ 
        showModal: !this.state.showModal,
        successMessage: "",
        errors: {} 
    });
  }

  validateForm = () => {
    const { leave_type, start_date, end_date, start_time, end_time, reason, emergency_number } = this.state.form;
    let errors = {};
  
    if (!start_date) errors.start_date = "Start date is required";
    if (!reason) errors.reason = "Reason is required";
    if (!emergency_number) errors.emergency_number = "Emergency contact is required";

    // Half Day Validation
    if (leave_type === 'half-day') {
      if (!start_time) errors.start_time = "Start time is required";
      if (!end_time) errors.end_time = "End time is required";
    }

    // Custom Day Validation
    if (leave_type === 'custome-day') {
      if (!end_date) {
        errors.end_date = "End date is required";
      } else if (new Date(end_date) < new Date(start_date)) {
        errors.end_date = "End date cannot be before start date";
      }
    }
  
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async () => {
    if (!this.validateForm()) return;
  
    try {
      const payload = { ...this.state.form };
      await annualleave(payload);
  
      this.setState({
        successMessage: "Leave request submitted successfully!",
        form: {
          leave_type: "fullday",
          start_date: "",
          end_date: "",
          start_time: "",
          end_time: "",
          reason: "",
          emergency_number: ""
        }
      });

      setTimeout(() => this.toggleModal(), 2000);
  
    } catch (error) {
      this.setState({ successMessage: "Error submitting request" });
    }
  };

  render() {
    const { form, errors, showModal, successMessage } = this.state;

    return (
      <div className="annual-leave-container">
        {/* Statistics Card */}
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

        <div className="vision-bar-wrapper text-center">
            <Image src={logoimage} alt="Vision" priority style={{ width: 'auto', height: 'auto', maxWidth: '70%' }} />
        </div>

        {/* Modal Logic */}
        {showModal && (
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
              
              <div className="modal-body-form">
                {/* Leave Type Selector - Important for Backend */}
                <div className="form-group-custom">
                  <label>Leave Type</label>
                  <select name="leave_type" className="form-control-custom" value={form.leave_type} onChange={this.handleChange}>
                    <option value="fullday">Full Day</option>
                    <option value="half-day">Half Day</option>
                    <option value="custome-day">Custom Range</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group-custom">
                    <label>Start Date</label>
                    <input type="date" name="start_date" className="form-control-custom" value={form.start_date} onChange={this.handleChange} />
                    {errors.start_date && <small className="text-danger">{errors.start_date}</small>}
                  </div>

                  {/* Show End Date only for Custom Range */}
                  {form.leave_type === 'custome-day' && (
                    <div className="col-md-6 form-group-custom">
                      <label>End Date</label>
                      <input type="date" name="end_date" className="form-control-custom" value={form.end_date} onChange={this.handleChange} />
                      {errors.end_date && <small className="text-danger">{errors.end_date}</small>}
                    </div>
                  )}
                </div>

                {/* Show Times only for Half Day */}
                {form.leave_type === 'half-day' && (
                  <div className="row">
                    <div className="col-md-6 form-group-custom">
                      <label>Start Time</label>
                      <input type="time" name="start_time" className="form-control-custom" value={form.start_time} onChange={this.handleChange} />
                      {errors.start_time && <small className="text-danger">{errors.start_time}</small>}
                    </div>
                    <div className="col-md-6 form-group-custom">
                      <label>End Time</label>
                      <input type="time" name="end_time" className="form-control-custom" value={form.end_time} onChange={this.handleChange} />
                      {errors.end_time && <small className="text-danger">{errors.end_time}</small>}
                    </div>
                  </div>
                )}

                <div className="form-group-custom">
                  <label>Reason</label>
                  <textarea name="reason" className="form-control-custom" rows="2" value={form.reason} onChange={this.handleChange} placeholder="Reason..."></textarea>
                  {errors.reason && <small className="text-danger">{errors.reason}</small>}
                </div>

                <div className="form-group-custom">
                  <label>Emergency Contact</label>
                  <input type="text" name="emergency_number" className="form-control-custom" value={form.emergency_number} onChange={this.handleChange} placeholder="+44..." />
                  {errors.emergency_number && <small className="text-danger">{errors.emergency_number}</small>}
                </div>
              </div>

              {successMessage && <div className="alert alert-info py-2 small text-center">{successMessage}</div>}

              <div className="modal-footer-row">
                <button className="btn-cancel-modal" onClick={this.toggleModal}>Cancel</button>
                <button className="btn-submit-modal" onClick={this.handleSubmit}>Submit Request</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Annual_Leave;
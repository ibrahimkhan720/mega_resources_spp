"use client"

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import logoimage from "../../assets/images/5ffac5b492ec250053baf0085380433da86f99d5.png"
import Image from 'next/image'
import {annualleave} from "@/Api/AnnualLeavepi";

const PalmTree = "🌴"; 
const Seedling = "🌱";

export class Annual_Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      form: {
        start_date: "",
        end_date: "",
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
      }
    });
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal !== this.state.showModal) {
      if (this.state.showModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }

  validateForm = () => {
    const { start_date, end_date, reason, emergency_number } = this.state.form;
    let errors = {};
  
    if (!start_date) {
      errors.start_date = "Start date is required";
    } else if (new Date(start_date) < new Date().setHours(0,0,0,0)) {
      errors.start_date = "Start date cannot be in the past";
    }
  
    if (!end_date) {
      errors.end_date = "End date is required";
    } else if (new Date(end_date) < new Date(start_date)) {
      errors.end_date = "End date must be after start date";
    }
  
    if (!reason) {
      errors.reason = "Reason is required";
    }
  
    if (!emergency_number) {
      errors.emergency_number = "Emergency number is required";
    }
  
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async () => {
    if (!this.validateForm()) return;
  
    try {
      await annualleave(this.state.form);
  
      this.setState({
        successMessage: "Leave sent successfully",
        form: {
          start_date: "",
          end_date: "",
          reason: "",
          emergency_number: ""
        },
        errors: {}
      });
  
    } catch (error) {
      console.error(error);
      this.setState({
        successMessage: "Something went wrong"
      });
    }
  };

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

        <div className="vision-bar-wrapper text-center">
            <Image 
                src={logoimage} 
                alt="One Team One Vision" 
                priority
                style={{ width: 'auto', height: 'auto', maxWidth: '70%' }}
            />
        </div>

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

                <div className="form-group-custom">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    className="form-control-custom"
                    value={this.state.form.start_date}
                    onChange={this.handleChange}
                  />
                  {this.state.errors?.start_date && (
                    <small className="text-danger">{this.state.errors.start_date}</small>
                  )}
                </div>

                <div className="form-group-custom">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    className="form-control-custom"
                    value={this.state.form.end_date}
                    onChange={this.handleChange}
                  />
                  {this.state.errors?.end_date && (
                    <small className="text-danger">{this.state.errors.end_date}</small>
                  )}
                </div>

                <div className="form-group-custom">
                  <label>Reason for Leave</label>
                  <textarea
                    name="reason"
                    className="form-control-custom"
                    rows="3"
                    value={this.state.form.reason}
                    onChange={this.handleChange}
                    placeholder="Please provide a brief reason..."
                  />
                  {this.state.errors?.reason && (
                    <small className="text-danger">{this.state.errors.reason}</small>
                  )}
                </div>

                <div className="form-group-custom">
                  <label>Emergency Contact Number</label>
                  <input
                    type="text"
                    name="emergency_number"
                    className="form-control-custom"
                    value={this.state.form.emergency_number}
                    onChange={this.handleChange}
                    placeholder="+44 7XXX XXXXXX"
                  />
                  {this.state.errors?.emergency_number && (
                    <small className="text-danger">{this.state.errors.emergency_number}</small>
                  )}
                </div>

                </div>
                
                {this.state.successMessage && (
                <div className="alert alert-success w-100 text-center">
                  {this.state.successMessage}
                </div>
              )}
              <div className="modal-footer-row">
              <button className="btn-cancel-modal" onClick={this.toggleModal}>
                Cancel
              </button>
              <button className="btn-submit-modal" onClick={this.handleSubmit}>
                Submit Request
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Annual_Leave
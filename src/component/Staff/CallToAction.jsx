"use client"

import React, { Component } from 'react'

export class CallToAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleOpen = () => {
    this.setState({ showModal: true });
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  }

  handleClose = () => {
    this.setState({ showModal: false });
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  render() {
    return (
      <div className="container pb-5">
        <div 
          className="card border-0 shadow-sm" 
          style={{ 
            borderRadius: '25px', 
            backgroundColor: '#ffffff',
            padding: '25px 40px' 
          }}
        >
          <div className="card-body p-0">
            <h3 
              className="fw-bold mb-3" 
              style={{ color: '#002b5c', fontSize: '20px' }}
            >
              Need More Information?
            </h3>
            
            <p 
              className="mb-4 text-muted" 
              style={{ fontSize: '14px', maxWidth: '800px' }}
            >
              If you have any questions about these benefits or how to access them, 
              please contact HR or speak with your manager.
            </p>

            <button 
              onClick={this.handleOpen}
              className="btn px-4 py-2 fw-bold contact-hr-btn" 
              style={{ 
                backgroundColor: '#00205b', 
                color: 'white', 
                borderRadius: '12px',
                fontSize: '16px',
                minWidth: '160px',
                height: '50px'
              }}
            >
              Contact HR
            </button>
          </div>
        </div>

        {/* --- HR Modal --- */}
        {this.state.showModal && (
          <div className="hr-full-overlay">
            <div className="hr-modal-box">
              <button className="hr-close-x" onClick={this.handleClose}>✕</button>
              
              <div className="hr-icon-circle">📞</div>
              
              <h2 className="hr-modal-title">HR Support Line</h2>
              <p className="hr-modal-desc">Please call the number below for assistance</p>

              <div className="hr-number-card">
                <a href="tel:01536524205" className="hr-phone-link">
                  01536 524 205
                </a>
              </div>

              <button className="hr-btn-close-bottom" onClick={this.handleClose}>
                Close Details
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default CallToAction
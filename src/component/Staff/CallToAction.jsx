"use client"

import React, { Component } from 'react'

export class CallToAction extends Component {
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
              className="btn px-4 py-2 fw-bold" 
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
      </div>
    )
  }
}

export default CallToAction
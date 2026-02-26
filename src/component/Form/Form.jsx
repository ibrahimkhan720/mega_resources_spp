"use client"

import Link from 'next/link';
import React, { Component } from 'react'

export class Forms extends Component {
  render() {
    const rows = Array.from({ length: 19 }, (_, i) => i + 11);

    return (
      <div className="container-fluid py-4" style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        
        {/* Top Back Link */}
        <div className="mb-3" style={{ paddingLeft: '8%' }}>
          <Link href="/" style={{ color: '#002b5c', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Main Card */}
        <div className="card shadow-sm mx-auto border-0" style={{ 
          maxWidth: '1200px', 
          borderRadius: '20px', 
          padding: '40px',
          width: '90%'
        }}>
          
          <h2 className="fw-bold mb-3" style={{ color: '#004a99' }}>Mileage Tracking and Reimbursement Form</h2>
          <p className="text-muted mb-5" style={{ fontSize: '14px' }}>
            Mileage Form- Please complete whole 2 week period on one form. The distance is calculated from the first visit of the day up until the last visit, including all intermediate visits. Do not include journeys to or from home.
          </p>

          <form>
            {/* Full Name */}
            <div className="row mb-4">
              <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Full Name <span className="text-danger">*</span></label>
              <div className="col-md-6">
                <input type="text" className="form-control" style={{ borderRadius: '8px', padding: '12px' }} />
                <small className="text-muted">first name</small>
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" style={{ borderRadius: '8px', padding: '12px' }} />
                <small className="text-muted">Surname</small>
              </div>
            </div>

            {/* Rate Per Mile */}
            <div className="mb-4 col-md-4">
              <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Rate Per Mile (30p) <span className="text-danger">*</span></label>
              <input type="text" className="form-control" defaultValue="0.30" style={{ borderRadius: '8px', padding: '12px' }} />
            </div>

            {/* Branch */}
            <div className="mb-4">
              <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Branch: <span className="text-danger">*</span></label>
              {['Northamptonshire', 'Bedfordshire', 'Oxfordshire', 'Gloucestershire', 'Hertfordshire'].map((branch) => (
                <div className="form-check mb-2" key={branch}>
                  <input className="form-check-input" type="radio" name="branch" id={branch} />
                  <label className="form-check-label ms-2" htmlFor={branch} style={{ color: '#004a99' }}>{branch}</label>
                </div>
              ))}
            </div>

            {/* Date Selection */}
            <div className="row mb-5">
              <div className="col-md-6">
                <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date From <span className="text-danger">*</span></label>
                <input type="date" className="form-control" style={{ borderRadius: '8px', padding: '12px' }} />
                <small className="text-muted">Date</small>
              </div>
              <div className="col-md-6">
                <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date To <span className="text-danger">*</span></label>
                <input type="date" className="form-control" style={{ borderRadius: '8px', padding: '12px' }} />
                <small className="text-muted">Date</small>
              </div>
            </div>

            {/* Exact Table Design from Figma */}
            <div className="table-responsive">
              <table className="table table-sm" style={{ border: '1px solid #e0e0e0', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#ffffff' }}>
                  <tr style={{ color: '#004a99', fontSize: '14px' }}>
                    <th className="p-2 border" style={{ width: '50px' }}></th>
                    <th className="p-2 border text-center">Date</th>
                    <th className="p-2 border text-center">Business Purpose</th>
                    <th className="p-2 border text-center">Start Post Code</th>
                    <th className="p-2 border text-center">End Post Code</th>
                    <th className="p-2 border text-center">Comments</th>
                    <th className="p-2 border text-center">Miles</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row}>
                      <td className="p-2 border  text-center" style={{ color: '#004a99', backgroundColor: '#fcfcfc' }}>{row}</td>
                      <td className="p-0 border"><input type="text" className="table-input" /></td>
                      <td className="p-0 border"><input type="text" className="table-input" /></td>
                      <td className="p-0 border"><input type="text" className="table-input" /></td>
                      <td className="p-0 border"><input type="text" className="table-input" /></td>
                      <td className="p-0 border"><input type="text" className="table-input" /></td>
                      {/* Miles column without arrows */}
                      <td className="p-0 border">
                        <input type="number" className="table-input text-left" style={{ MozAppearance: 'textfield' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Calculations */}
            <div className="mt-5 col-md-4">
              <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Miles: (Auto Calculation)</label>
              <input type="text" className="form-control bg-light" defaultValue="0.0" disabled style={{ borderRadius: '8px', padding: '12px' }} />
            </div>
            <div className="mt-4 mb-4 col-md-4">
              <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Mileage in £ : (Auto Calculation)</label>
              <input type="text" className="form-control bg-light" defaultValue="0.00" disabled style={{ borderRadius: '8px', padding: '12px' }} />
            </div>

            {/* Footer Checkbox */}
            <div className="form-check mt-5 mb-5">
              <input className="form-check-input" type="checkbox" id="confirm" required />
              <label className="form-check-label ms-2 text-muted" htmlFor="confirm" style={{ fontSize: '13px' }}>
                By submitting this mileage, I confirm that it complies with the mileage policy and take full responsibility for my submission : <span className="text-danger">*</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center gap-3">
              <button type="button" className="btn btn-outline-secondary px-5 py-2" style={{ borderRadius: '8px' }}>Save</button>
              <button type="submit" className="btn btn-success px-5 py-2" style={{ borderRadius: '8px', backgroundColor: '#00b341', border: 'none' }}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Forms
"use client"

import React, { Component } from 'react'
// Icons import karein
import { 
  DollarSign, 
  Car, 
  GraduationCap, 
  ShieldCheck, 
  Gift, 
  Heart, 
  TrendingUp, 
  Users 
} from 'lucide-react';

export class Cards extends Component {
  render() {
    const benefits = [
      { title: "Bi-Weekly Pay", desc: "Get paid every two weeks for better financial planning", icon: <DollarSign size={24} />, color: "#3b82f6" },
      { title: "Pay Advances", desc: "Up to £1000 which is paid back with no interest", icon: <DollarSign size={24} />, color: "#22c55e" },
      { title: "Mileage Contribution", desc: "Reimbursement for work-related travel expenses", icon: <Car size={24} />, color: "#a855f7" },
      { title: "Car Maintenance Scheme", desc: "Get up to £100 each year for any car repairs, ", icon: <Car size={24} />, color: "#6366f1" },
      { title: "Comprehensive Training Provided", desc: "You will be paid for shadowing", icon: <GraduationCap size={24} />, color: "#06b6d4" },
      { title: "Free Uniform", desc: "Professional uniform provided at no cost", icon: <ShieldCheck size={24} />, color: "#0ea5e9" },
      { title: "Up to £250 Referral Bonus", desc: "Earn rewards for referring quality candidates", icon: <Gift size={24} />, color: "#f97316" },
      { title: "Free PPE", desc: "Face masks, aprons, gloves, hand sanitiser etc", icon: <ShieldCheck size={24} />, color: "#ec4899" },
      { title: "20% Off Domiciliary Home Care", desc: "Discount on home care services for ", icon: <Heart size={24} />, color: "#ef4444" },
      { title: "Progression and Development Pathways", desc: "We will pay for your Health & Social Care qualification up to level 7", icon: <TrendingUp size={24} />, color: "#8b5cf6" },
      { title: "Care Support & Well-Being Service", desc: "Access to mental health support and wellness resources", icon: <Users size={24} />, color: "#10b981" },
    ];

    return (
      <div className="container-fluid " style={{  minHeight: '100vh' }}>
        <div className="container-fluid banefits_sub_Card">
          <div className="row g-4">
            {benefits.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
              
                <div className="card border-0 shadow-sm" style={{ 
                  borderRadius: '12px',
                  padding: '35px 30px' 
                }}>
                  
                 
                  <div className="d-flex align-items-center justify-content-center mb-4" 
                       style={{ 
                         width: '55px', 
                         height: '55px', 
                         backgroundColor: item.color, 
                         borderRadius: '10px',
                         color: 'white'
                       }}>
                    {item.icon}
                  </div>

                  {/* Content Section */}
                  <div className="card-body p-0">
                    <h5 className="card-title fw-bold mb-3" style={{ 
                      color: '#1a202c', 
                      fontSize: '19px',
                      letterSpacing: '-0.3px'
                    }}>
                      {item.title}
                    </h5>
                    <p className="card-text text-secondary" style={{ 
                      fontSize: '14.5px', 
                      lineHeight: '1.6',
                      fontWeight: '400'
                    }}>
                      {item.desc}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Cards
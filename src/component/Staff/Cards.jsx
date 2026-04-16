"use client"

import React, { Component } from 'react'
import { DollarSign, Car, GraduationCap, ShieldCheck, Gift, Heart, TrendingUp, Users } from 'lucide-react';
import { getstaff } from "../../Api/StaffBanefitsapi" 

export class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      benefits: [],
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const data = await getstaff();
      if (data && data.info) {
        this.setState({ benefits: data.info, loading: false });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching staff benefits:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { benefits, loading } = this.state;

    const getStaticAssets = (title) => {
      if (!title) return { icon: <Users size={24} />, color: "#10b981" };
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('pay')) return { icon: <DollarSign size={24} />, color: "#3b82f6" };
      if (lowerTitle.includes('mileage') || lowerTitle.includes('car')) return { icon: <Car size={24} />, color: "#a855f7" };
      if (lowerTitle.includes('training') || lowerTitle.includes('pathways')) return { icon: <GraduationCap size={24} />, color: "#06b6d4" };
      if (lowerTitle.includes('uniform') || lowerTitle.includes('ppe')) return { icon: <ShieldCheck size={24} />, color: "#0ea5e9" };
      if (lowerTitle.includes('referral')) return { icon: <Gift size={24} />, color: "#f97316" };
      if (lowerTitle.includes('care') || lowerTitle.includes('well-being')) return { icon: <Heart size={24} />, color: "#ef4444" };
      return { icon: <Users size={24} />, color: "#10b981" }; 
    };

    return (
      <div className="container-fluid" style={{ minHeight: '100vh' }}>
        <div className="container-fluid banefits_sub_Card">
          <div className="row g-4">
            
            {loading ? (
              /* Skeleton Loader Loop (6 items) */
              [...Array(6)].map((_, i) => (
                <div className="col-12 col-md-6 col-lg-4" key={i}>
                  <div className="card border-0 shadow-sm" style={{ 
                    borderRadius: '12px',
                    padding: '35px 30px',
                    height: '100%' 
                  }}>
                    {/* Icon Skeleton */}
                    <div className="skeleton mb-4" style={{ width: '55px', height: '55px', borderRadius: '10px' }}></div>
                    {/* Title Skeleton */}
                    <div className="skeleton skeleton-text w-75 mb-3" style={{ height: '24px' }}></div>
                    {/* Description Skeleton */}
                    <div className="skeleton skeleton-text w-100 mb-2"></div>
                    <div className="skeleton skeleton-text w-100 mb-2"></div>
                    <div className="skeleton skeleton-text w-50"></div>
                  </div>
                </div>
              ))
            ) : (
              /* Real Data Loop */
              benefits.map((item, index) => {
                const assets = getStaticAssets(item.title);
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={item.id || index}>
                    <div className="card border-0 shadow-sm" style={{ 
                      borderRadius: '12px',
                      padding: '35px 30px',
                      height: '100%' 
                    }}>
                      
                      {/* Static Icon Section */}
                      <div className="d-flex align-items-center justify-content-center mb-4" 
                           style={{ 
                             width: '55px', 
                             height: '55px', 
                             backgroundColor: assets.color, 
                             borderRadius: '10px',
                             color: 'white'
                           }}>
                        {assets.icon}
                      </div>

                      {/* Dynamic Content Section */}
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
                          {item.description}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                );
              })
            )}

          </div>
        </div>
      </div>
    )
  }
}

export default Cards
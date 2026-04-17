"use client";

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faStar, faStop, faTimes, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { PROFILE_FILE_URL } from '@/utility/profileimage';

import { claimReward, getreward, getStaffProfile } from "../../Api/Rewardapi"
import { getachievement } from '@/Api/Achievementapi' 

export class Staff_Points extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      showThankYou: false,
      rewards: [],
      achievements: [], 
      rewardsLoading: false,
      staffData: {
        name: "",
        points: 0, 
        hours: 0,
        branch_id: "",
        department_id: "",
        staff_img: null
      }
    };
  }

  componentDidMount() {
    this.fetchInitialData();
  }

  fetchInitialData = async () => {
    try {
      const profile = JSON.parse(localStorage.getItem('user_data'));

      // Pehle Local Storage se data set karein
      this.setState({
        staffData: {
          name: profile?.name || "Staff Member",
          branch_id: profile?.branch?.name || profile?.branch_id || "N/A",
          department_id: profile?.department?.name || profile?.department_id || "N/A",
          staff_img: profile?.staff_img || null,
          points: Number(profile?.points || 0),
          hours: Number(profile?.hours || 0) 
        }
      });

      // Phir API se taaza data lein
      this.updatePoints();
      
      // Achievements API se targets lein
      getachievement().then((res) => {
        const achData = res?.info || res?.data || [];
        // Hours ke hisab se sort kar dein taake order sahi rahe (1000, 2000...)
        const sortedAch = achData.sort((a, b) => Number(a.hours) - Number(b.hours));
        this.setState({ achievements: sortedAch });
      });

    } catch (error) {
      console.error("Init Error:", error);
    }
  }

  updatePoints = async () => {
    const res = await getStaffProfile();
    const fresh = res?.info || res?.data || res;
    this.setState((prev) => ({
      staffData: {
        ...prev.staffData,
        points: Number(fresh?.points || 0),
        hours: Number(fresh?.hours || 0)
      }
    }));
  }

  fetchRewards = async () => {
    try {
      this.setState({ rewardsLoading: true });
      const res = await getreward();
      this.setState({ rewards: res?.info || [] });
    } catch (error) {
      console.error("Rewards Error:", error);
    } finally {
      this.setState({ rewardsLoading: false });
    }
  }

  openClaimModal = () => {
    this.setState({ isOpen: true }, () => {
        this.fetchRewards(); 
    });
  }

  handleClaim = async (id, cost) => {
    if (this.state.staffData.points < cost) return;

    try {
      await claimReward(id, {});
      this.setState({
        isOpen: false,
        showThankYou: true
      });
      await this.updatePoints();
    } catch (error) {
      console.error("Claim Error:", error);
    }
  }

  toggleClaim = () => { 
    this.setState(prev => ({ isOpen: !prev.isOpen })); 
  }

  closeThankYou = () => { 
    this.setState({ showThankYou: false }); 
  }

  render() {
    const { staffData, rewards, achievements, rewardsLoading, isOpen, showThankYou } = this.state;
    const userImageUrl = staffData.staff_img ? `${PROFILE_FILE_URL}/${staffData.staff_img}` : "/default-avatar.png";
    const isProfileLoading = staffData.points === 0 && achievements.length === 0;

    // Logic: Agla achievement dhoondein jo abhi poora nahi hua
    const nextTargetIndex = achievements.findIndex(ach => staffData.hours < Number(ach.hours));

    return (
      <section className="container-fluid main-hero-section my-4">
        <div className="heroSection px-4 px-lg-5">
          <div className="row align-items-center justify-content-between g-0">
            
            <div className="col-lg-7 py-3">
              <div className="d-flex gap-2 mb-2 flex-wrap">
                <div className="badge rounded-pill pointsBadge">
                  My Points: <span className="fw-bold">{staffData.points}</span>
                </div>
                <div className="badge rounded-pill pointsBadge">
                  Hours: <span className="fw-bold">{staffData.hours}</span>
                </div>
              </div>

              <h1 className="h3 fw-normal mb-4 text-white">
                Your <span className="fw-bold">Staff Points Plan</span>
              </h1>

              <div className="icons d-flex flex-wrap gap-3">
                {achievements.length === 0
                  ? [...Array(4)].map((_, i) => (
                      <div key={i} className="text-center">
                        <div className="iconCircle skeleton"></div>
                        <small className="skeleton skeleton-text sm mt-2"></small>
                      </div>
                    ))
                  : achievements.map((ach, index) => {
                      const targetValue = Number(ach.hours);
                      const isCompleted = staffData.hours >= targetValue;
                      const isCurrent = index === nextTargetIndex;

                      let bgColor = '#ff6b6b'; // Default Red
                      let icon = faStop;      // Default Stop
                      let circleClass = "iconCircle";

                      if (isCompleted) {
                        bgColor = '#00c1a1'; // Green
                        icon = faCheck;
                      } else if (isCurrent) {
                        bgColor = '#ffc107'; // Yellow
                        icon = faStar;
                        circleClass += " activeCircle starAnimation"; // Zoom effect
                      }

                      return (
                        <div className="text-center" key={index}>
                          <div className={circleClass} style={{ backgroundColor: bgColor }}>
                            <FontAwesomeIcon icon={icon} />
                          </div>
                          <small className="fw-bold d-block text-white">{targetValue} hrs</small>
                        </div>
                      );
                    })}
              </div>
            </div>

            <div className="col-lg-3 text-center text-lg-end py-3">
              <div className="d-inline-block text-center">
                <div className="profileImageContainer shadow-sm">
                    <Image 
                      src={userImageUrl} 
                      alt={staffData.name}
                      width={120} height={120} 
                      className="w-100 h-100" 
                      style={{ objectFit: 'cover' }} 
                      priority unoptimized={true}
                    />
                </div>

                <h5 className="mb-0 fw-bold text-white mt-2">{staffData.name}</h5>
                <p className="small text-white-50 mb-0">{staffData.department_id}</p>
                <p className="small text-white-50">{`( ${staffData.branch_id} )`}</p>
                
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <button className="customBtn btnClaim" onClick={this.openClaimModal}>Claim</button>
                  <button className="customBtn btnView">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`slideDownModal ${isOpen ? 'open' : ''}`}>
          <div className="innerModal bg-white p-4 p-md-5 mt-3 shadow-sm border rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0">Available Rewards</h4>
              <button onClick={this.toggleClaim} className="closeBtn"><FontAwesomeIcon icon={faTimes} /></button>
            </div>

            <div className="row g-3">
              {rewardsLoading ? (
                // Modal Skeleton Cards
                [...Array(4)].map((_, i) => (
                  <div key={i} className="col-lg-3 col-md-6 col-sm-12">
                    <div className="rewardCardItem d-flex p-3 flex-column border rounded" style={{height: '180px'}}>
                      <div className="skeleton skeleton-text w-75 mb-2"></div>
                      <div className="skeleton skeleton-text w-50 mb-4"></div>
                      <div className="skeleton skeleton-btn mt-auto"></div>
                    </div>
                  </div>
                ))
              ) : rewards.map((reward) => {
                    const cost = Number(reward.point_cost);
                    const canAfford = staffData.points >= cost;
                    return (
                      <div key={reward.id} className="col-lg-3 col-md-6 col-sm-12">
                        <div className="rewardCardItem d-flex align-items-center p-3 text-center h-100 flex-column justify-content-between border rounded">
                          <div className="mb-3">
                            <p className="small fw-bold text-uppercase mb-1">{reward.reward_title}</p>
                            <p className="small text-muted mb-0">{reward.point_cost} Points</p>
                          </div>
                          <button 
                            className="btn-claim w-100"
                            onClick={() => this.handleClaim(reward.id, cost)}
                            disabled={!canAfford}
                            style={{
                              backgroundColor: canAfford ? '#00c951' : '#e0e0e0',
                              color: canAfford ? '#fff' : '#888',
                              border: 'none', padding: '8px', borderRadius: '5px',
                              cursor: canAfford ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Claim
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>


        {/* THANK YOU MODAL */}
        {showThankYou && (
          <div className="thankYouOverlay">
            <div className="thankYouModal p-5 text-center shadow-lg rounded-4 bg-white">
              <FontAwesomeIcon icon={faCircleCheck} className="successAnimate mb-4" style={{fontSize: '70px', color: '#00c1a1'}} />
              <h2 className="fw-bold mb-2">Thank You!</h2>
              <p className="text-muted mb-4">Your reward has been claimed successfully.</p>
              <button className="customBtn btnClaim px-5" onClick={this.closeThankYou}>Got it!</button>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Staff_Points;
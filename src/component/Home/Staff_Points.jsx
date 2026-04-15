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
      loading: false,
      rewardsLoading: false,
      redeemedIds: [],
      staffData: {
        name: "",
        points: 0, 
        branch_id: "",
        department_id: "",
        staff_img: null
      }
    };
  }

  componentDidMount() {
    this.fetchInitialData();
  }

  // ✅ INSTANT UI LOAD (NON-BLOCKING)
  fetchInitialData = async () => {
    try {
      const profile = JSON.parse(localStorage.getItem('user_data'));

      // 🔥 SHOW UI IMMEDIATELY
      this.setState({
        staffData: {
          name: profile?.name || "Staff Member",
          branch_id: profile?.branch?.name || profile?.branch_id || "N/A",
          department_id: profile?.department?.name || profile?.department_id || "N/A",
          staff_img: profile?.staff_img || null,
          points: 0
        }
      });

      // 🚀 LOAD POINTS (FAST)
      getStaffProfile().then((res) => {
        const fresh = res?.info || res?.data || res;

        this.setState((prev) => ({
          staffData: {
            ...prev.staffData,
            points: Number(fresh?.points || 0)
          }
        }));
      });

      // 🚀 LOAD ACHIEVEMENTS
      getachievement().then((res) => {
        this.setState({
          achievements: res?.info || []
        });
      });

    } catch (error) {
      console.error("Init Error:", error);
    }
  }

  // 🚀 LOAD REWARDS ONLY WHEN MODAL OPENS
  openClaimModal = async () => {
    this.setState({ isOpen: true });

    if (this.state.rewards.length === 0) {
      try {
        this.setState({ rewardsLoading: true });

        const res = await getreward();
        const rewardsData = res?.info || [];

        this.setState({
          rewards: rewardsData,
          redeemedIds: rewardsData
            .filter(r => r.is_claimed === true || r.is_claimed === 1)
            .map(r => r.id),
        });

      } catch (error) {
        console.error("Rewards Error:", error);
      } finally {
        this.setState({ rewardsLoading: false });
      }
    }
  }

  // ✅ CLAIM OPTIMIZED
  handleClaim = async (id) => {
    try {
      await claimReward(id, {});

      this.setState((prevState) => ({
        redeemedIds: [...prevState.redeemedIds, id],
        isOpen: false,
        showThankYou: true
      }));

      // 🔥 UPDATE POINTS ONLY
      const profileRes = await getStaffProfile();
      const fresh = profileRes?.info || profileRes?.data || profileRes;

      this.setState((prev) => ({
        staffData: {
          ...prev.staffData,
          points: Number(fresh?.points || 0)
        }
      }));

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
    const { staffData, rewards, achievements, rewardsLoading, redeemedIds, isOpen, showThankYou } = this.state;
  
    const userImageUrl = staffData.staff_img 
      ? `${PROFILE_FILE_URL}/${staffData.staff_img}` 
      : "/default-avatar.png";
  
    const isProfileLoading = staffData.points === 0;
  
    return (
      <section className="container-fluid main-hero-section my-4">
        <div className="heroSection px-4 px-lg-5">
          <div className="row align-items-center justify-content-between g-0">
  
            {/* LEFT */}
            <div className="col-lg-7 py-3">
              <div className="badge rounded-pill pointsBadge">
                My Points:{" "}
                <span className="fw-bold">
                  {isProfileLoading 
                    ? <span className="skeleton skeleton-text sm"></span> 
                    : staffData.points}
                </span>
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
                      const style = [
                        { color: '#00c1a1', icon: faCheck },
                        { color: '#00c1a1', icon: faCheck },
                        { color: '#ffc107', icon: faStar, active: true },
                        { color: '#ff6b6b', icon: faStop }
                      ][index] || { color: '#00c1a1', icon: faCheck };
  
                      return (
                        <div className="text-center" key={index}>
                          <div className={`iconCircle ${style.active ? 'activeCircle starAnimation' : ''}`} 
                               style={{ backgroundColor: style.color }}>
                            <FontAwesomeIcon icon={style.icon} />
                          </div>
                          <small className="fw-bold d-block text-white">{ach.hours} hrs</small>
                        </div>
                      );
                    })}
              </div>
            </div>
  
            {/* RIGHT */}
            <div className="col-lg-3 text-center text-lg-end py-3">
              <div className="d-inline-block text-center">
  
                <div className="profileImageContainer shadow-sm">
                  {isProfileLoading ? (
                    <div className="skeleton skeleton-avatar"></div>
                  ) : (
                    <Image 
                      src={userImageUrl} 
                      alt={staffData.name}
                      width={120} 
                      height={120} 
                      className="w-100 h-100" 
                      style={{ objectFit: 'cover' }} 
                      priority 
                      unoptimized={true}
                    />
                  )}
                </div>
  
                <h5 className="mb-0 fw-bold text-white mt-2">
                  {isProfileLoading 
                    ? <span className="skeleton skeleton-text"></span> 
                    : staffData.name}
                </h5>
  
                <div className='justify-content-center text-center '>
                  <p className="small text-white-50">
                    {isProfileLoading 
                      ? <span className="skeleton skeleton-text sm"></span> 
                      : staffData.department_id}
                  </p>
                  <p className="small text-white-50">
                    {isProfileLoading 
                      ? <span className="skeleton skeleton-text sm"></span> 
                      : `( Branch ${staffData.branch_id} )`}
                  </p>
                </div>
                
                <div className="d-flex justify-content-center gap-2">
                  <button className="customBtn btnClaim" onClick={this.openClaimModal}>Claim</button>
                  <button className="customBtn btnView">View Profile</button>
                </div>
  
              </div>
            </div>
  
          </div>
        </div>
  
        {/* MODAL */}
        <div className={`slideDownModal ${isOpen ? 'open' : ''}`}>
          <div className="innerModal bg-white p-4 p-md-5 mt-3 shadow-sm border rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0">Your Staff Points Plan</h4>
              <button onClick={this.toggleClaim} className="closeBtn">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
  
            <div className="row g-3">
              {rewardsLoading
                ? [...Array(6)].map((_, i) => (
                    <div key={i} className="col-lg-3 col-md-6 col-sm-12">
                      <div className="rewardCardItem p-3 text-center">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text sm mt-2"></div>
                        <div className="skeleton skeleton-btn mt-3"></div>
                      </div>
                    </div>
                  ))
                : rewards.map((reward, index) => {
                    const rId = reward.id || index;
                    const isRedeemed = redeemedIds.includes(rId);
                    const cannotClaim = staffData.points < Number(reward.point_cost) && !isRedeemed;
  
                    return (
                      <div key={rId} className="col-lg-3 col-md-6 col-sm-12">
                        <div className="rewardCardItem d-flex align-items-center p-3 text-center h-100 flex-column justify-content-between">
                          <div>
                            <p className="small fw-bold text-uppercase">{reward.reward_title}</p>
                            <p className="small text-muted">{reward.point_cost} Points</p>
                          </div>
                          <button 
                            className={isRedeemed ? "btn-redeem" : "btn-claim"}
                            onClick={() => this.handleClaim(rId)}
                            disabled={cannotClaim || isRedeemed}
                          >
                            {isRedeemed ? 'Redeemed' : (cannotClaim ? 'Locked' : 'Claim')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
  
        {showThankYou && (
          <div className="thankYouOverlay">
            <div className="thankYouModal p-5 text-center shadow-lg rounded-4 bg-white">
              <div className="mb-4">
                 <FontAwesomeIcon icon={faCircleCheck} className="successAnimate" style={{fontSize: '70px', color: '#00c1a1'}} />
              </div>
              <h2 className="fw-bold mb-2" style={{color: '#333'}}>Thank You!</h2>
              <p className="text-muted mb-4">Your reward has been claimed successfully.</p>
              <button className="customBtn btnClaim px-5" onClick={this.closeThankYou} style={{width: 'auto'}}>Got it!</button>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Staff_Points;
"use client";

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faStar, faStop, faTimes, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { PROFILE_FILE_URL } from '@/utility/profileimage';
import GlobalLoader from '../../GlobalLoader/GlobalLoader';

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
      loading: true,
      redeemedIds: [],
      staffData: { name: "", points: 0, branch_id: "", department_id: "", staff_img: null }
    };
  }

  async componentDidMount() { await this.fetchInitialData(); }

  fetchInitialData = async () => {
    try {
      this.setState({ loading: true });
      const token = localStorage.getItem('token');
      const profile = JSON.parse(localStorage.getItem('user_data'));
      
      const [profileRes, rewardRes, achievementRes] = await Promise.all([
        getStaffProfile(token),
        getreward(),
        getachievement()
      ]);

      const freshProfileData = profileRes?.info || profileRes?.data || profileRes;
      this.setState({
        staffData: {
          name: profile?.name || "Staff Member",
          branch_id: profile?.branch?.name || profile?.branch_id || "N/A",
          department_id: profile?.department?.name || profile?.department_id || "N/A",
          staff_img: profile?.staff_img || null,
          points: freshProfileData?.points !== undefined ? Number(freshProfileData.points) : 0 
        },
        rewards: rewardRes?.info || [],
        redeemedIds: rewardRes?.info ? rewardRes.info.filter(r => r.is_claimed === true || r.is_claimed === 1).map(r => r.id) : [],
        achievements: achievementRes?.info || []
      });
    } catch (error) { console.error(error); } 
    finally { this.setState({ loading: false }); }
  }

  handleClaim = async (id) => {
    const token = localStorage.getItem('token'); 
    if (!token) return;
    try {
      this.setState({ loading: true });
      await claimReward(id, {}, token);
      const profileRes = await getStaffProfile(token);
      this.setState({ 
        redeemedIds: [...this.state.redeemedIds, id],
        isOpen: false, 
        showThankYou: true,
        staffData: { ...this.state.staffData, points: profileRes?.info?.points || 0 }
      });
    } catch (error) { console.error(error); } 
    finally { this.setState({ loading: false }); }
  }

  toggleClaim = () => { this.setState({ isOpen: !this.state.isOpen }); }
  closeThankYou = () => { this.setState({ showThankYou: false }); }

  render() {
    const { staffData, rewards, achievements, loading, redeemedIds, isOpen, showThankYou } = this.state;
    const userImageUrl = staffData.staff_img ? `${PROFILE_FILE_URL}/${staffData.staff_img}` : "https://via.placeholder.com/120";

    // Reusable Achievement Circles Logic - Fixing Colors & Alignment
    const renderAchievements = (isModal = false) => (
      <div className={`icons d-flex flex-wrap gap-3 ${isModal ? 'justify-content-center' : ''}`}>
        {achievements.map((ach, index) => {
          const style = [
            { color: '#00c1a1', icon: faCheck },
            { color: '#00c1a1', icon: faCheck },
            { color: '#ffc107', icon: faStar, active: true },
            { color: '#ff6b6b', icon: faStop }
          ][index] || { color: '#00c1a1', icon: faCheck };

          return (
            <div className="text-center" key={index}>
              <div className={`iconCircle ${style.active ? 'activeCircle starAnimation' : ''}`} 
                   style={{ backgroundColor: style.color, color: 'white' }}>
                <FontAwesomeIcon icon={style.icon} />
              </div>
              <small className={`fw-bold d-block ${isModal ? 'text-dark' : 'text-white'}`}>{ach.hours} hrs</small>
            </div>
          );
        })}
      </div>
    );

    const modalrenderAchievements = (isModal = false) => (
      <div className={`icons d-flex flex-wrap gap-3 ${isModal ? 'justify-content-center' : ''}`}>
        {achievements.map((ach, index) => {
          const style = [
            { color: '#00c1a1', icon: faCheck },
            { color: '#00c1a1', icon: faCheck },
            { color: '#ffc107', icon: faStar, active: true },
            { color: '#ff6b6b', icon: faStop }
          ][index] || { color: '#00c1a1', icon: faCheck };

          return (
            <div className="text-center" key={index}>
              <div className={`modaliconCircle`} 
                   style={{ backgroundColor: style.color, color: 'white' }}>
                <FontAwesomeIcon icon={style.icon} />
              </div>
              <small className={`fw-bold d-block ${isModal ? 'text-dark' : 'text-white'}`}>{ach.hours} hrs</small>
            </div>
          );
        })}
      </div>
    );

    return (
      <>
        {loading && <GlobalLoader />}

        <section className="container-fluid main-hero-section my-4">
          <div className="heroSection px-4 px-lg-5">
            <div className="row align-items-center justify-content-between g-0">
              <div className="col-lg-7 py-3">
                <div className="badge rounded-pill pointsBadge">
                  My Points: <span className="fw-bold">{loading ? "..." : staffData.points}</span>
                </div>
                <h1 className="h3 fw-normal mb-4 text-white">
                  Your <span className="fw-bold">Staff Points Plan</span>
                </h1>
                {renderAchievements(false)} 
              </div>

              <div className="col-lg-3 text-center text-lg-end py-3">
                <div className="d-inline-block text-center">
                  <div className="profileImageContainer shadow-sm">
                    <Image src={userImageUrl} alt={staffData.name} width={120} height={120} className="w-100 h-100" style={{ objectFit: 'cover' }} priority unoptimized={true} />
                  </div>
                  <h5 className="mb-0 fw-bold text-white mt-2">{staffData.name}</h5>
                  <p className="small text-white-50 mb-0">Dept {staffData.department_id}</p>
                  <p className="small text-white-50 mb-2">( Branch {staffData.branch_id} )</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="customBtn btnClaim" onClick={this.toggleClaim}>Claim</button>
                    <button className="customBtn btnView">View Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`slideDownModal ${isOpen ? 'open' : ''}`}>
            <div className="innerModal bg-white p-4 p-md-5 mt-3 shadow-sm border rounded-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Your Staff Points Plan</h4>
                <button onClick={this.toggleClaim} className="closeBtn"><FontAwesomeIcon icon={faTimes} /></button>
              </div>

              <div className="mb-5 text-center">
                {modalrenderAchievements(true)}
              </div>

              <div className="row g-3">
                {rewards.map((reward, index) => {
                  const rId = reward.id || index;
                  const isRedeemed = redeemedIds.includes(rId);
                  const cannotClaim = staffData.points < Number(reward.point_cost) && !isRedeemed;

                  return (
                    <div key={rId} className="col-lg-3 col-md-6 col-sm-12">
                      <div className="rewardCardItem d-flex align-items-center p-3 text-center h-100 d-flex flex-column justify-content-between">
                        <div>
                          <p className="small fw-bold text-uppercase mb-1">{reward.reward_title}</p>
                          <p className="small text-muted mb-0">{reward.point_cost} Points</p>
                        </div>
                        <button 
                          className={isRedeemed ? "btn-redeem" : "btn-claim"}
                          onClick={() => this.handleClaim(rId)}
                          disabled={cannotClaim || isRedeemed}
                          style={{ 
                            backgroundColor: isRedeemed ? '#6c757d' : (cannotClaim ? '#ccc' : '#00c1a1'),
                            color: '#fff', border: 'none', padding: '10px', borderRadius: '25px', width: '100%', marginTop: '10px',
                            cursor: (cannotClaim || isRedeemed) ? 'not-allowed' : 'pointer'
                          }}
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
                <FontAwesomeIcon icon={faCircleCheck} className="successAnimate mb-4" style={{fontSize: '70px', color: '#00c1a1'}} />
                <h2 className="fw-bold mb-2">Thank You!</h2>
                <p className="text-muted mb-4">Your reward has been claimed successfully.</p>
                <button className="customBtn btnClaim px-5" onClick={this.closeThankYou}>Got it!</button>
              </div>
            </div>
          )}

        <style jsx>{`
          .thankYouOverlay {
            position: fixed; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex; align-items: center; justify-content: center;
            z-index: 10000;
          }
          .thankYouModal {
            max-width: 450px; width: 90%;
            border-top: 5px solid #00c1a1;
            animation: popIn 0.4s ease-out;
          }
          @keyframes popIn {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .successAnimate { animation: bounce 0.6s ease; }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-20px);}
            60% {transform: translateY(-10px);}
          }
        `}</style>


        </section>
      </>
    );
  }
}

export default Staff_Points;


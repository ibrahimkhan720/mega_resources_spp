"use client"

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faStar, faStop, faTimes, faExclamationCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import king from "../../assets/images/2528ba7934b38571d9d321aba12ea04bdc4eba19.avif"
// Agar aapke paas koi specific success image hai toh yahan import karein:
// import successImg from "../../assets/images/success-celebration.png"

import { claimReward, getreward, getStaffProfile } from "../../Api/Rewardapi"

export class Staff_Points extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      showThankYou: false, // Success popup state
      rewards: [],
      loading: true,
      redeemedIds: [],
      staffData: {
        name: "King Lawal",
        points: 0,
        branch_id: "",
        department_id: ""
      }
    };
  }

  async componentDidMount() {
    await this.fetchInitialData();
  }

  fetchInitialData = async () => {
    try {
      const profile = await getStaffProfile();
      if (profile) {
        this.setState({
          staffData: {
            name: profile.name || "King Lawal",
            points: Number(profile.points) || 0,
            branch_id: profile.branch_id || "N/A",
            department_id: profile.department_id || "N/A"
          }
        });
      }

      const response = await getreward();
      if (response && response.info) {
        // Database se check karna ke kaunse rewards already claimed hain
        const alreadyRedeemed = response.info
          .filter(r => r.is_claimed === true || r.is_claimed === 1) 
          .map(r => r.id);

        this.setState({ 
          rewards: response.info, 
          redeemedIds: alreadyRedeemed 
        });
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  toggleClaim = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  closeThankYou = () => {
    this.setState({ showThankYou: false });
  }

  handleClaim = async (id) => {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    try {
      // 1. Post API hit (Database mein save)
      await claimReward(id, {}, token);

      // 2. State update (Redeemed mark karna aur Popups manage karna)
      this.setState({ 
        redeemedIds: [...this.state.redeemedIds, id],
        isOpen: false, // Card list wala modal band
        showThankYou: true // Thank you popup khul jaye
      });

      // 3. Points update karne ke liye refresh
      await this.fetchInitialData();

    } catch (error) {
      console.error("Claim Error:", error);
      alert(error.response?.data?.message || "Error claiming reward.");
    }
  }

  render() {
    const { staffData, rewards, loading, redeemedIds, isOpen, showThankYou } = this.state;

    return (
      <section className="container-fluid main-hero-section my-4">

        {/* HERO SECTION - DESIGN AS IT IS */}
        <div className="heroSection px-4 px-lg-5">
          <div className="row align-items-center justify-content-between g-0">
            <div className="col-lg-7 py-3">
              <div className="badge rounded-pill pointsBadge">
                My Points: <span className="fw-bold">{staffData.points}</span>
              </div>
              <h1 className="h3 fw-normal mb-4 text-white">
                Your <span className="fw-bold">Staff Points Plan</span>
              </h1>
              
              <div className="icons d-flex flex-wrap gap-3">
                <div className="text-center">
                  <div className="iconCircle" style={{ backgroundColor: '#00c1a1' }}><FontAwesomeIcon icon={faCheck} /></div>
                  <small className="fw-bold d-block text-white">1000 Hrs</small>
                </div>
                <div className="text-center">
                  <div className="iconCircle" style={{ backgroundColor: '#00c1a1' }}><FontAwesomeIcon icon={faCheck} /></div>
                  <small className="fw-bold d-block text-white">2000 Hrs</small>
                </div>
                <div className="text-center">
                  <div className="iconCircle activeCircle starAnimation" style={{ backgroundColor: '#ffc107' }}><FontAwesomeIcon icon={faStar} /></div>
                  <small className="fw-bold d-block text-white">3000 Hrs</small>
                </div>
                <div className="text-center">
                  <div className="iconCircle" style={{ backgroundColor: '#ff6b6b' }}><FontAwesomeIcon icon={faStop} /></div>
                  <small className="fw-bold d-block text-white">4000 Hrs</small>
                </div>
              </div>
            </div>

            <div className="col-lg-3 text-center text-lg-end py-3">
              <div className="d-inline-block text-center">
                <div className="profileImageContainer shadow-sm">
                  <Image src={king} alt="User" width={120} height={120} className="w-100 h-100" style={{ objectFit: 'cover' }} priority />
                </div>
                <h5 className="mb-0 fw-bold text-white mt-2">{staffData.name}</h5>
                <div className='d-flex justify-content-center text-center gap-2'>
                  <p className="small text-white-50 mb-3">Dept ID: {staffData.department_id}</p>
                  <p className="small text-white-50 mb-0">( Branch ID: {staffData.branch_id} )</p>
                </div>
                
                <div className="d-flex justify-content-center gap-2">
                  <button className="customBtn btnClaim" onClick={this.toggleClaim}>Claim</button>
                  <button className="customBtn btnView">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CLAIM LIST MODAL */}
        <div className={`slideDownModal ${isOpen ? 'open' : ''}`}>
          <div className="innerModal bg-white p-4 p-md-5 mt-3 shadow-sm border rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0">Your Staff Points Plan</h4>
              <button onClick={this.toggleClaim} className="closeBtn">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="row g-3">
              {loading ? (
                <div className="text-center w-100 py-4">Loading Rewards...</div>
              ) : rewards.map((reward, index) => {
                const rId = reward.id || index;
                const isRedeemed = redeemedIds.includes(rId);
                // Agar redeemed hai toh lock nahi dikhayega bhale hi points kam hon
                const cannotClaim = staffData.points < Number(reward.point_cost) && !isRedeemed;

                return (
                  <div key={rId} className="col-lg-3 col-md-6 col-sm-12">
                    <div className="rewardCardItem d-flex align-items-center p-3 text-center h-100 d-flex flex-column justify-content-between">
                      <div>
                        <p className="small fw-bold text-uppercase">{reward.reward_title}</p>
                        <p className="small text-muted">{reward.point_cost} Points</p>
                      </div>
                      <button 
                        className={isRedeemed ? "btn-redeem" : "btn-claim"}
                        onClick={() => this.handleClaim(rId)}
                        disabled={cannotClaim || isRedeemed}
                        style={{ 
                          backgroundColor: isRedeemed ? '#6c757d' : (cannotClaim ? '#ccc' : '#00c1a1'),
                          color: '#fff',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '25px',
                          cursor: (cannotClaim || isRedeemed) ? 'not-allowed' : 'pointer',
                          width: '100%',
                          opacity: cannotClaim ? 0.6 : 1
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

        {/* --- THANK YOU POPUP (SUCCESS) --- */}
        {showThankYou && (
          <div className="thankYouOverlay">
            <div className="thankYouModal p-5 text-center shadow-lg rounded-4 bg-white">
              <div className="mb-4">
                 <FontAwesomeIcon icon={faCircleCheck} className="successAnimate" style={{fontSize: '70px', color: '#00c1a1'}} />
              </div>
              <h2 className="fw-bold mb-2" style={{color: '#333'}}>Thank You!</h2>
              <p className="text-muted mb-4">Your reward has been claimed successfully and saved in our records.</p>
              <button className="customBtn btnClaim px-5" onClick={this.closeThankYou} style={{width: 'auto'}}>Got it!</button>
            </div>
          </div>
        )}

        <style jsx>{`
          .thankYouOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
          }
          .thankYouModal {
            max-width: 450px;
            width: 90%;
            border-top: 5px solid #00c1a1;
            animation: popIn 0.4s ease-out;
          }
          @keyframes popIn {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .successAnimate {
            animation: bounce 0.6s ease;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-20px);}
            60% {transform: translateY(-10px);}
          }
        `}</style>

      </section>
    )
  }
}

export default Staff_Points;
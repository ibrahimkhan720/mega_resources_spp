"use client"

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faStar, faStop, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import king from "../../assets/images/2528ba7934b38571d9d321aba12ea04bdc4eba19.avif"
import { getreward, getStaffProfile } from "../../Api/Rewardapi"

export class Staff_Points extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
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
        this.setState({ rewards: response.info });
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

  handleClaim = (id) => {
    this.setState({ redeemedIds: [...this.state.redeemedIds, id] });
  }

  render() {
    const { staffData, rewards, loading, redeemedIds, isOpen } = this.state;

    return (
      <section className="container-fluid main-hero-section my-4">

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

        {/* MODAL */}
        <div className={`slideDownModal ${isOpen ? 'open' : ''}`}>
          <div className="innerModal bg-white p-4 p-md-5 mt-3 shadow-sm border rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0">Your Staff Points Plan</h4>
              <button onClick={this.toggleClaim} className="closeBtn">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="d-flex justify-content-center gap-3 mb-5">
              <div className="text-center">
                <div className="iconCircleLarge mx-auto mb-2" style={{ backgroundColor: '#00c1a1' }}><FontAwesomeIcon icon={faCheck} /></div>
                <small className="fw-bold text-muted">1000 Hrs</small>
              </div>
              <div className="text-center">
                <div className="iconCircleLarge mx-auto mb-2" style={{ backgroundColor: '#00c1a1' }}><FontAwesomeIcon icon={faCheck} /></div>
                <small className="fw-bold text-muted">2000 Hrs</small>
              </div>
              <div className="text-center">
                <div className="iconCircleLarge mx-auto mb-2" style={{ backgroundColor: '#ffc107' }}><FontAwesomeIcon icon={faStar} /></div>
                <small className="fw-bold text-muted">3000 Hrs</small>
              </div>
              <div className="text-center">
                <div className="iconCircleLarge mx-auto mb-2" style={{ backgroundColor: '#ff6b6b' }}><FontAwesomeIcon icon={faStop} /></div>
                <small className="fw-bold text-muted">4000 Hrs</small>
              </div>
            </div>

            <div className="alertBoxRed p-3 mb-4 d-flex gap-3">
              <div className="redCircle"><FontAwesomeIcon icon={faExclamationCircle} /></div>
              <div>
                <h6 className="fw-bold mb-1">Earn points for hours you work.</h6>
                <p className="small mb-1 text-muted">The rule is simple, for every hour you work, you accrue 2 points. Once you acquired certain points you can claim your reward.</p>
                <p className="fw-bold m-0 small">1hr = 2 Points.</p>
              </div>
            </div>

            <div className="row g-3">
              {loading ? (
                <div className="text-center w-100 py-4">Loading Rewards...</div>
              ) : rewards.map((reward, index) => {
                const rId = reward.id || index;
                const isRedeemed = redeemedIds.includes(rId);
                const cannotClaim = staffData.points < Number(reward.point_cost);

                return (
                  <div key={rId} className="col-lg-3 col-md-6 col-sm-12">
                    <div className="rewardCardItem d-flex align-items-center p-3 text-center h-100 d-flex flex-column justify-content-between" >
                      <div>
                        <p className="small fw-bold text-uppercase">{reward.reward_title}</p>
                        <p className="small text-muted">{reward.point_cost} Points</p>
                      </div>
                      <button 
                        className={isRedeemed ? "btn-redeem" : "btn-claim"}
                        onClick={() => this.handleClaim(rId)}
                        disabled={cannotClaim || isRedeemed}
                        style={{ 
                          opacity: cannotClaim && !isRedeemed ? 0.6 : 1,
                          cursor: (cannotClaim || isRedeemed) ? 'not-allowed' : 'pointer'   ,
                          color: '#fff',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '25px',
                          cursor: (cannotClaim || isRedeemed) ? 'not-allowed' : 'pointer',
                          transition: '0.3s',
                          width: '14rem'

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
      </section>
    )
  }
}

export default Staff_Points;

"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getcareer } from '@/Api/CareerPathawayapi';

const Career = () => {
    // States for data and loading
    const [pathways, setPathways] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state add ki

    useEffect(() => {
        const fetchCareerData = async () => {
            try {
                setLoading(true);
                const response = await getcareer();
                if (response && response.info) {
                    setPathways(response.info);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCareerData();
    }, []);

    return (
        <div className="career-page-container py-4">
            <div className="container main-wrapper">
                
                {/* Back Button */}
                <div className="mb-3 px-2">
                    <Link href="/" className="back-link text-decoration-none">
                        <i className="fa-solid fa-arrow-left me-2"></i> Back to Dashboard
                    </Link>
                </div>

                <div className="custom-card p-4 p-md-5 shadow-sm border">
                    <div className="mb-5">
                        <h2 className="fw-bold mb-1" style={{ color: '#081c44' }}>Career Pathway</h2>
                        <p className="text-muted">Explore progression opportunities and requirements within MEGA CARELINE</p>
                    </div>

                    {/* TOP STEPS - Static design remains same */}
                    <div className="row text-center mb-5 align-items-center g-0">
                        <div className="col">
                            <div className="step-item active">
                                <div className="icon-circle main-icon active-bg"><i className="fa-solid fa-user-doctor"></i></div>
                                <div className="mt-2 fw-bold small-text">Carer</div>
                                <small className="text-muted d-block">Level 1</small>
                            </div>
                        </div>
                        <div className="col-auto"><i className="fa-solid fa-arrow-right text-light-gray"></i></div>
                        <div className="col">
                            <div className="step-item">
                                <div className="icon-circle main-icon"><i className="fa-solid fa-user-nurse"></i></div>
                                <div className="mt-2 fw-bold small-text">Senior Carer</div>
                                <small className="text-muted d-block">Level 2</small>
                            </div>
                        </div>
                        <div className="col-auto"><i className="fa-solid fa-arrow-right text-light-gray"></i></div>
                        <div className="col">
                            <div className="step-item">
                                <div className="icon-circle main-icon"><i className="fa-solid fa-user-group"></i></div>
                                <div className="mt-2 fw-bold small-text">Care Coordinator</div>
                                <small className="text-muted d-block">Level 3</small>
                            </div>
                        </div>
                        <div className="col-auto"><i className="fa-solid fa-arrow-right text-light-gray"></i></div>
                        <div className="col">
                            <div className="step-item">
                                <div className="icon-circle main-icon"><i className="fa-solid fa-user-tie"></i></div>
                                <div className="mt-2 fw-bold small-text">Manager</div>
                                <small className="text-muted d-block">Level 4</small>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC REQUIREMENTS SECTION */}
                    {loading ? (
                        /* Skeleton Placeholders */
                        [...Array(2)].map((_, index) => (
                            <div key={index} className="requirement-section mb-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="skeleton skeleton-text w-25 h-large"></div>
                                    <div className="skeleton skeleton-text w-10 h-large"></div>
                                </div>
                                <div className="skeleton skeleton-text w-50 mb-4"></div>
                                
                                <div className="list-group mb-3">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="skeleton skeleton-card mb-2" style={{ height: "50px", borderRadius: "8px" }}></div>
                                    ))}
                                </div>

                                <div className="progress-area mt-4">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="skeleton skeleton-text w-25"></div>
                                        <div className="skeleton skeleton-text w-10"></div>
                                    </div>
                                    <div className="skeleton w-100" style={{ height: '8px', borderRadius: '4px' }}></div>
                                </div>
                                <hr className="mt-5" style={{ opacity: '0.1' }} />
                            </div>
                        ))
                    ) : (
                        pathways.map((item, index) => (
                            <div key={item.id || index} className="requirement-section mb-5">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <h5 className="fw-bold m-0 section-title">{item.title}</h5>
                                    <span className="badge level-badge-black">Level {item.level}</span>
                                </div>
                                <p className="text-muted x-small mb-3">Requirements to progress to next level</p>
                                
                                <div className="list-group mb-3">
                                    {(() => {
                                        let requirementsArray = [];
                                        try {
                                            if (Array.isArray(item.requirements)) {
                                                requirementsArray = item.requirements;
                                            } else if (typeof item.requirements === 'string') {
                                                requirementsArray = JSON.parse(item.requirements);
                                            }
                                        } catch (e) {
                                            console.error("Requirements parse nahi ho saki:", e);
                                        }

                                        return requirementsArray.length > 0 ? (
                                            requirementsArray.map((req, i) => (
                                                <div key={i} className="list-group-item border-0 mb-2 d-flex align-items-center bg-light-gray" style={{ padding: "12px" }}>
                                                    <i className="fa-regular fa-circle tick-small text-muted me-3"></i>
                                                    <span className="small">{req}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted small ps-3">No requirements listed.</p>
                                        );
                                    })()}
                                </div>

                                {/* <div className="progress-area">
                                    <div className="d-flex justify-content-between x-small text-muted mb-1">
                                        <span>Points Required: {item.points_required}</span>
                                        <span>0 / {item.requirements?.length || 0}</span>
                                    </div>
                                    <div className="progress" style={{ height: '6px' }}>
                                        <div className="progress-bar bg-success" style={{ width: '0%' }}></div>
                                    </div>
                                </div> */}
                                <hr className="mt-5" style={{ opacity: '0.1' }} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Career;
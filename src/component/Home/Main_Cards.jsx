"use client"

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUserGroup, 
  faGift, 
  faClipboardCheck, 
  faHandshakeAngle, 
  faFolderOpen, 
  faSitemap 
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

export class Main_Cards extends Component {
  render() {
    const cardsData = [
      {
        title: "Staff benefits:",
        subtext: "Pay Advances, Mental Health Support, Car Maintenance Scheme",
        btnText: "Benefits",
        icon: faUserGroup,
        colorClass: "color-blue",
        btnColor: "text-blue",
        link: "/Staff"
      },
      {
        title: "Staff Points Plan:",
        subtext: "Win a range of prizes including gadgets, Annual Leave, Cash & More",
        btnText: "SPP",
        icon: faGift,
        colorClass: "color-red",
        btnColor: "text-red",
        link: "/Point"
      },
      {
        title: "Claim Mileage:",
        subtext: "You can submit your mileage form here",
        btnText: "Mileage",
        icon: faClipboardCheck,
        colorClass: "color-blue-dark",
        btnColor: "text-blue-dark",
        link: "/Mileage_Tracking"
      },
      {
        title: "Career Pathway:",
        subtext: "View how you can advance your career at with us here",
        btnText: "Career Pathway",
        icon: faHandshakeAngle,
        colorClass: "color-teal",
        btnColor: "text-teal",
        link: "/Career_Pathway"
      },
      {
        title: "Job Openings:",
        subtext: "View and Apply for job internally here",
        btnText: "Job Openings",
        icon: faFolderOpen,
        colorClass: "color-orange",
        btnColor: "text-orange",
        link: "/Job_Openings"
      },
      {
        title: "Organisation Chart:",
        subtext: "View contact information, roles, organisational structure",
        btnText: "Org Chart",
        icon: faSitemap,
        colorClass: "color-blue-bright",
        btnColor: "text-blue-bright",
        link: "/Organisation_Chart"
      }
    ];

    return (
      <div className="main-cards-wrapper">
        <div className="container-fluid">
          <div className="row g-4">
            {cardsData.map((card, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <Link href={card.link} className="text-decoration-none" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div className="dashboard-main-card shadow-sm" style={{ cursor: 'pointer', height: '100%' }}>
                    <div className={`icon-box ${card.colorClass}`}>
                      <FontAwesomeIcon icon={card.icon} />
                    </div>
                    <h6 className="card-heading" style={{ textDecoration: 'none' }}>{card.title}</h6>
                    <p className="card-subtext">{card.subtext}</p>
                    <button className={`btn-card-link ${card.btnColor}`} style={{ pointerEvents: 'none' }}>
                      {card.btnText}
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Main_Cards
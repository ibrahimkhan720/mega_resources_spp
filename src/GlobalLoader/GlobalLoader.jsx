// components/GlobalLoader.js
import React from 'react';

const GlobalLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
      <p>Loading, please wait...</p>
      <style jsx>{`
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(26, 26, 26, 0.9); /* Dark background with transparency */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 99999; /* Sabse upar rahega */
          color: #fff;
        }
        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid rgba(255, 255, 255, 0.1);
          border-top: 6px solid #00c1a1; /* Aapka theme color */
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GlobalLoader;
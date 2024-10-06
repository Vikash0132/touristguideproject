import React from 'react';
import './Home.css'; // Import the CSS specific to this component

const Home = () => {
  return (
    <div className="home-tab">
      <div className="category-container">
        <div className="category-header">INTERNATIONAL</div>
        <div className="grid-container">
          <div className="grid-item">PARIS</div>
          <div className="grid-item">KATHMANDU</div>
          <div className="grid-item">ITALY</div>
        </div>
      </div>

      <div className="category-container">
        <div className="category-header">NATIONAL</div>
        <div className="grid-container">
          <div className="grid-item">DEHRADUN</div>
          <div className="grid-item">MANALI</div>
          <div className="grid-item"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

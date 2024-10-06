import React from 'react';
import './Home.css'; // Import the CSS specific to this component

const Home = () => {
  return (
    <div className="home-tab">
      <div className="category-container">
        <div className="category-header">I_____nternational</div>
        <div className="grid-container">
          <div className="Paris">Paris</div>
          <div className="ktm">Kathmandu</div>
          <div className="Italy">Italy</div>
        </div>
      </div>

      <div className="category-container">
        <div className="category-header">National</div>
        <div className="grid-container">
          <div className="Dehradun-">Dehradun</div>
          <div className="Manali">Manali</div>
          <div className="Goa">Goa</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'; // Import Home component

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
            <Tab eventKey="home" title="Home">
              {/* Importing Home component here */}
              <Home />
            </Tab>
            <Tab eventKey="restaurants" title="Restaurants">
              <p>Restaurants nearby</p>
              <input type="text" placeholder="Search restaurants..."></input>
            </Tab>
            <Tab eventKey="hotels" title="Hotels">
              <p>Hotels nearby</p>
              <input type="text" placeholder="Search hotels..."></input>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

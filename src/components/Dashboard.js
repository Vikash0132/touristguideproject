import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabSelect = (key) => {
    setActiveTab(key);
    // Update any other components based on the selected tab if needed
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
            <Tab eventKey="home" title="Home">
              {/* Home tab content */}
              <p>Go to your dream destination</p>
            </Tab>
            <Tab eventKey="restaurants" title="Restaurants">
              {/* Restaurants tab content */}
              <p>Restaurants nearby</p>
              <input type="text"></input>
            </Tab>
            <Tab eventKey="hotels" title="Hotels">
              {/* Hotels tab content */}
              <p>Hotels nearyby</p>
              <input type="text"></input>
            </Tab>
            {/* Add more tabs as needed */}
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

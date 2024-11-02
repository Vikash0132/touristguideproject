import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'; // Import Home component
import Map from './map'; // Assuming you have a Map component

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
              {/* Home tab with imported Home component */}
              <Home />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
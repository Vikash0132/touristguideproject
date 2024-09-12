import React, { useState, useContext } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginContext } from './context/LoginContext'; // Import LoginContext

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { isLoggedIn } = useContext(LoginContext); // Use context to access login state

  const handleTabSelect = (key) => {
    setActiveTab(key);
    // Update any other components based on the selected tab if needed
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Dashboard</h1>
          {isLoggedIn && ( // Conditionally render search bar based on isLoggedIn
            <div className="search-bar">
              {/* Your search bar component */}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
            <Tab eventKey="home" title="Home">
              {/* Home tab content */}
              <p>Welcome to the home tab!</p>
            </Tab>
            <Tab eventKey="restaurants" title="Restaurants">
              {/* Restaurants tab content */}
              <p>Here you can find nearby restaurants.</p>
            </Tab>
            <Tab eventKey="hotels" title="Hotels">
              {/* Hotels tab content */}
              <p>Here you can find nearby hotels.</p>
            </Tab>
            {/* Add more tabs as needed */}
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'; // Import Home component
import Map from './map'; // Assuming you have a Map component

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Home />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
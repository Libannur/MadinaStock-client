'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getSuppliers } from '../../api/supplierData';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);

  const getTheSuppliers = () => {
    getSuppliers().then(setSuppliers);
  };

  useEffect(() => {
    getTheSuppliers();
  }, []);

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #03391aff 50%, #51af9e41 50%, #77ac7fff 35%)',
    padding: '40px 0',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '50px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    border: '2px solid #d4af37',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const titleStyle = {
    color: '#d4af37',
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    marginBottom: '10px',
    fontFamily: 'serif',
  };

  const subtitleStyle = {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontStyle: 'italic',
    marginBottom: '0',
  };

  const cardStyle = {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '3px solid #d4af37',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const cardTitleStyle = {
    color: '#1a472a',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
    borderBottom: '2px solid #d4af37',
    paddingBottom: '10px',
  };

  const contactInfoStyle = {
    color: '#2d5016',
    fontSize: '0.95rem',
  };

  const decorativeStyle = {
    marginTop: '20px',
    textAlign: 'center',
    color: '#d4af37',
    fontSize: '1.2rem',
  };

  return (
    <div style={pageStyle}>
      <Container>
        {/* Header Section */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>🌟 Our Trusted Suppliers 🌟</h1>
          <p style={subtitleStyle}>Connecting you with authentic Somali ingredients and restaurant supplies</p>
        </div>

        {/* Suppliers Grid */}
        <Row className="g-4">
          {suppliers.map((supplier) => (
            <Col key={supplier.id} lg={4} md={6} sm={12}>
              <Link href={`/suppliers/${supplier.id}`} style={{ textDecoration: 'none' }}>
                <Card style={cardStyle}>
                  <div
                    style={{
                      height: '8px',
                      background: 'linear-gradient(90deg, #d4af37, #f4e154, #d4af37)',
                      width: '100%',
                    }}
                  />

                  <Card.Body style={{ padding: '25px' }}>
                    <Card.Title style={cardTitleStyle}>{supplier.name}</Card.Title>

                    <div style={contactInfoStyle}>
                      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#d4af37', marginRight: '8px' }}>📧</span>
                        <strong>Email:</strong> {supplier.email}
                      </div>

                      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#d4af37', marginRight: '8px' }}>📞</span>
                        <strong>Phone:</strong> {supplier.phone}
                      </div>

                      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#d4af37', marginRight: '8px' }}>📍</span>
                        <strong>Address:</strong> {supplier.address}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#d4af37', marginRight: '8px' }}>🏙️</span>
                        <strong>Location:</strong> {supplier.city}, {supplier.state} {supplier.zip_code}
                      </div>
                    </div>

                    <div style={decorativeStyle}>✦ ◆ ✦</div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

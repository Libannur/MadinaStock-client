import React from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #03391aff 50%, #51af9e41 50%, #77ac7fff 35%)',
    display: 'flex',
    alignItems: 'center',
    padding: '40px 0',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '3px solid #d4af37',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
    maxWidth: '500px',
    margin: '0 auto',
    overflow: 'hidden',
  };

  const headerStyle = {
    textAlign: 'center',
    padding: '40px 30px 20px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderBottom: '2px solid #d4af37',
  };

  const titleStyle = {
    color: '#1a472a',
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontFamily: 'serif',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const welcomeStyle = {
    color: '#2d5016',
    fontSize: '1.3rem',
    fontStyle: 'italic',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    color: '#2d5016',
    fontSize: '1rem',
    marginBottom: '0',
    lineHeight: '1.5',
  };

  const bodyStyle = {
    padding: '40px 30px',
    textAlign: 'center',
  };

  const instructionStyle = {
    color: '#1a472a',
    fontSize: '1.2rem',
    marginBottom: '30px',
    fontWeight: '500',
  };

  const signInButtonStyle = {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
    color: '#1a472a',
    fontWeight: 'bold',
    padding: '15px 40px',
    fontSize: '1.3rem',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)',
    transition: 'all 0.3s ease',
  };

  const decorativeStyle = {
    marginTop: '30px',
    color: '#d4af37',
    fontSize: '1.5rem',
  };

  const featuresStyle = {
    marginTop: '25px',
    color: '#2d5016',
    fontSize: '0.95rem',
  };

  return (
    <div style={pageStyle}>
      <Container>
        <Card style={cardStyle}>
          {/* Decorative Top Border */}
          <div
            style={{
              height: '10px',
              background: 'linear-gradient(90deg, #d4af37, #f4e154, #d4af37)',
              width: '100%',
            }}
          />

          {/* Header Section */}
          <div style={headerStyle}>
            <h1 style={titleStyle}>🌟 MadinaStock</h1>
            <p style={welcomeStyle}>Soo Dhawoww - Welcome!</p>
            <p style={descriptionStyle}>Madina restaurant management system</p>
          </div>

          {/* Body Section */}
          <div style={bodyStyle}>
            <p style={instructionStyle}>🔐 Please sign in to access your inventory management dashboard</p>

            <Button
              type="button"
              style={signInButtonStyle}
              onClick={signIn}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = '#1a472a';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#d4af37';
                e.target.style.color = '#1a472a';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
              }}
            >
              🚪 Sign In with Google
            </Button>

            {/* Features Preview */}
            <div style={featuresStyle}>
              <div style={{ marginBottom: '8px' }}>
                🤝 <strong>Manage Suppliers</strong> - Track your trusted partners
              </div>
              <div style={{ marginBottom: '8px' }}>
                🏷️ <strong>Organize Categories</strong> - Keep ingredients sorted
              </div>
              <div>
                📦 <strong>Track Inventory</strong> - Monitor stock levels
              </div>
            </div>

            {/* Decorative Element */}
            <div style={decorativeStyle}>✦ ◆ ✦</div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Signin;

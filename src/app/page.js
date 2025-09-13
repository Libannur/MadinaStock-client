'use client';

import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';

function Home() {
  const { user } = useAuth();

  const buttonStyle = {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
    color: '#1a472a',
    fontWeight: 'bold',
    padding: '15px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-between align-items-center"
      style={{
        height: '85vh',
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        gap: '20px',
        background: 'linear-gradient(135deg, #1a472a 0%, #2d5016 50%, #1a472a 100%)',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Welcome Section */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '10px',
            color: '#d4af37',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontFamily: 'serif',
          }}
        >
          Welcome, {user.displayName}! 🍽️
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            margin: '0',
            color: '#ffffff',
            fontStyle: 'italic',
          }}
        >
          To MadinaStock Inventory System
        </p>
        <div
          style={{
            color: '#d4af37',
            fontSize: '1.2rem',
            marginTop: '10px',
          }}
        >
          ✦ ◆ ✦
        </div>
      </div>

      {/* Logo Section */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '3px solid #d4af37',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '4rem',
          }}
        >
          📦
        </div>
        <p
          style={{
            color: '#d4af37',
            fontWeight: 'bold',
            marginTop: '15px',
            fontSize: '1.1rem',
          }}
        >
          Madina Restaurant Stock Management
        </p>
      </div>

      {/* Navigation Section */}
      <div className="w-100">
        <h3
          style={{
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#d4af37',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          SELECT A CATEGORY
        </h3>

        <Link href="/suppliers" className="d-block w-100 mb-3 text-decoration-none">
          <Button
            className="w-100"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1a472a';
              e.target.style.color = '#d4af37';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#d4af37';
              e.target.style.color = '#1a472a';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🤝 SUPPLIERS
          </Button>
        </Link>

        <Link href="/categories" className="d-block w-100 mb-3 text-decoration-none">
          <Button
            className="w-100"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1a472a';
              e.target.style.color = '#d4af37';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#d4af37';
              e.target.style.color = '#1a472a';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🏷️ CATEGORIES
          </Button>
        </Link>

        <Link href="/inventory-items" className="d-block w-100 mb-2 text-decoration-none">
          <Button
            className="w-100"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1a472a';
              e.target.style.color = '#d4af37';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#d4af37';
              e.target.style.color = '#1a472a';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            📦 INVENTORY ITEMS
          </Button>
        </Link>
      </div>

      {/* Decorative Footer */}
      <div
        style={{
          color: '#d4af37',
          fontSize: '1rem',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        Manage madina restaurant with ease ✨
      </div>
    </div>
  );
}

export default Home;

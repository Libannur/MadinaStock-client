/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const navbarStyle = {
    background: 'linear-gradient(135deg, #1a472a 0%, #2d5016 50%, #1a472a 100%)',
    borderBottom: '3px solid #d4af37',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    padding: '10px 0',
  };

  const brandStyle = {
    color: '#d4af37',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontFamily: 'serif',
    textDecoration: 'none',
  };

  const navLinkStyle = {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    margin: '0 5px',
  };

  const signOutButtonStyle = {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
    color: '#1a472a',
    fontWeight: 'bold',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={navbarStyle} variant="dark">
      <Container>
        <Link href="/" style={brandStyle} className="navbar-brand">
          🌟 MadinaStock
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ borderColor: '#d4af37' }} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link
              href="/"
              style={navLinkStyle}
              className="nav-link"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                e.target.style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
            >
              🏠 Home
            </Link>
            <Link
              href="/suppliers"
              style={navLinkStyle}
              className="nav-link"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                e.target.style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
            >
              🤝 Suppliers
            </Link>
            <Link
              href="/categories"
              style={navLinkStyle}
              className="nav-link"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                e.target.style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
            >
              🏷️ Categories
            </Link>
            <Link
              href="/inventory-items"
              style={navLinkStyle}
              className="nav-link"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                e.target.style.color = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
            >
              📦 Inventory Items
            </Link>
          </Nav>

          <Button
            style={signOutButtonStyle}
            onClick={signOut}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#1a472a';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#d4af37';
              e.target.style.color = '#1a472a';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🚪 Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

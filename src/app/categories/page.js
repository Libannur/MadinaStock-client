'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getCategories } from '../../api/categoryData';
import CategoryCard from '../../components/CategoryCard';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const getTheCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getTheCategories();
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
    marginBottom: '20px',
  };

  const addButtonStyle = {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
    color: '#1a472a',
    fontWeight: 'bold',
    padding: '12px 24px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    textDecoration: 'none',
  };

  return (
    <div style={pageStyle}>
      <Container>
        {/* Header Section */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>🏷️ Food Categories 🏷️</h1>
          <p style={subtitleStyle}>Organize your authentic Somali ingredients and menu items</p>
          <Link href="/categories/new">
            <Button style={addButtonStyle}>➕ Add New Category</Button>
          </Link>
        </div>

        {/* Categories Grid */}
        <Row className="g-4">
          {categories.map((category) => (
            <Col key={category.id} lg={4} md={6} sm={12}>
              <CategoryCard categoryObj={category} cardSize="100%" onUpdate={getTheCategories} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

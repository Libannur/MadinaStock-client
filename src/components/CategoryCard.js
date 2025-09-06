import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSingleCategory, deleteCategory } from '../api/categoryData';

export default function CategoryCard({ categoryObj, cardSize, onUpdate }) {
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    getSingleCategory(categoryObj.id).then((category) => {
      setCategoryData(category);
    });
  }, [categoryObj]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${categoryData.name}"?`)) {
      deleteCategory(categoryData.id).then(() => {
        onUpdate(); // Refresh the parent component
      });
    }
  };

  const cardStyle = {
    width: cardSize,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '3px solid #d4af37',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
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

  const contentStyle = {
    color: '#2d5016',
    fontSize: '0.95rem',
  };

  const decorativeStyle = {
    marginTop: '15px',
    marginBottom: '15px',
    textAlign: 'center',
    color: '#d4af37',
    fontSize: '1.2rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '15px',
  };

  return (
    <Card style={cardStyle}>
      {/* Decorative Top Border */}
      <div
        style={{
          height: '8px',
          background: 'linear-gradient(90deg, #d4af37, #f4e154, #d4af37)',
          width: '100%',
        }}
      />

      <Card.Body style={{ padding: '25px' }}>
        {/* Category Name */}
        <Link passHref href={`categories/${categoryData.id}`}>
          <div className="link">
            <Card.Title style={cardTitleStyle}>{categoryData.name}</Card.Title>
          </div>
        </Link>

        {/* Category Information */}
        <div style={contentStyle}>
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: '#d4af37', marginRight: '8px' }}>📝</span>
            <div>
              <strong>Description:</strong>
              <p style={{ margin: '5px 0 0 0', lineHeight: '1.4' }}>{categoryData.description}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#d4af37', marginRight: '8px' }}>📅</span>
            <strong>Created:</strong> {categoryData.created_date ? new Date(categoryData.created_date).toLocaleDateString() : ''}
          </div>
        </div>

        {/* Decorative Element */}
        <div style={decorativeStyle}>✦ ◆ ✦</div>

        {/* Action Buttons */}
        <div style={buttonContainerStyle}>
          <Link href={`/categories/edit/${categoryData.id}`}>
            <Button
              variant="warning"
              size="sm"
              style={{
                backgroundColor: '#d4af37',
                borderColor: '#d4af37',
                color: '#1a472a',
                fontWeight: 'bold',
                padding: '8px 16px',
              }}
            >
              ✏️ Edit
            </Button>
          </Link>

          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            style={{
              backgroundColor: '#dc3545',
              borderColor: '#dc3545',
              fontWeight: 'bold',
              padding: '8px 16px',
            }}
          >
            🗑️ Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    created_date: PropTypes.string,
  }).isRequired,
  cardSize: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

import { useEffect, useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSingleInventoryItem, deleteInventoryItem } from '../api/inventoryData';

export default function InventoryCard({ inventoryObj, cardSize, onUpdate }) {
  const [inventoryData, setInventoryData] = useState({});

  useEffect(() => {
    getSingleInventoryItem(inventoryObj.id).then((inventory) => {
      setInventoryData(inventory);
    });
  }, [inventoryObj]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${inventoryData.name}"?`)) {
      deleteInventoryItem(inventoryData.id).then(() => {
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

  const priceStyle = {
    color: '#d4af37',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10px 0',
  };

  const categoriesStyle = {
    marginTop: '10px',
    marginBottom: '10px',
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
        {/* Inventory Item Name */}
        <Link passHref href={`inventory-items/${inventoryData.id}`}>
          <div className="link">
            <Card.Title style={cardTitleStyle}>{inventoryData.name}</Card.Title>
          </div>
        </Link>

        {/* Supplier Information */}
        <div style={contentStyle}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#d4af37', marginRight: '8px' }}>🤝</span>
            <strong>Supplier:</strong> {inventoryData.supplier}
          </div>

          {/* Description */}
          {inventoryData.description && (
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ color: '#d4af37', marginRight: '8px' }}>📝</span>
              <div>
                <strong>Description:</strong>
                <p style={{ margin: '5px 0 0 0', lineHeight: '1.4' }}>{inventoryData.description}</p>
              </div>
            </div>
          )}

          {/* Unit */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#d4af37', marginRight: '8px' }}>📏</span>
            <strong>Unit:</strong> {inventoryData.unit}
          </div>

          {/* Notes */}
          {inventoryData.notes && (
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ color: '#d4af37', marginRight: '8px' }}>📝</span>
              <div>
                <strong>Notes:</strong>
                <p style={{ margin: '5px 0 0 0', lineHeight: '1.4', fontStyle: 'italic' }}>{inventoryData.notes}</p>
              </div>
            </div>
          )}

          {/* Created Date */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#d4af37', marginRight: '8px' }}>📅</span>
            <strong>Created:</strong> {inventoryData.created_date ? new Date(inventoryData.created_date).toLocaleDateString() : ''}
          </div>
        </div>

        {/* Price */}
        {inventoryData.price && <div style={priceStyle}>💰 ${inventoryData.price}</div>}

        {/* Categories */}
        {inventoryData.categories && inventoryData.categories.length > 0 && (
          <div style={categoriesStyle}>
            <div style={{ marginBottom: '8px', color: '#2d5016', fontWeight: 'bold' }}>🏷️ Categories:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {inventoryData.categories.map((category) => (
                <Badge
                  key={category}
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#1a472a',
                    fontSize: '0.8rem',
                    padding: '5px 10px',
                  }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Decorative Element */}
        <div style={decorativeStyle}>✦ ◆ ✦</div>

        {/* Action Buttons */}
        <div style={buttonContainerStyle}>
          <Link href={`/inventory-items/edit/${inventoryData.id}`}>
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

InventoryCard.propTypes = {
  inventoryObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    supplier: PropTypes.string,
    description: PropTypes.string,
    unit: PropTypes.string,
    notes: PropTypes.string,
    price: PropTypes.string,
    created_date: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  cardSize: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

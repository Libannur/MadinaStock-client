'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getInventoryItems } from '../../api/inventoryData';
import InventoryCard from '../../components/InventoryCard';

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const getTheInventoryItems = () => {
    getInventoryItems().then((items) => {
      setInventoryItems(items);
      setFilteredItems(items);
    });
  };

  useEffect(() => {
    getTheInventoryItems();
  }, []);

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(inventoryItems);
    } else {
      const filtered = inventoryItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredItems(filtered);
    }
  }, [searchTerm, inventoryItems]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #03391aff 0%, #51af9e41 0%, #77ac7fff 100%)',
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

  const searchContainerStyle = {
    maxWidth: '600px',
    margin: '0 auto 40px auto',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    border: '2px solid #d4af37',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const searchInputStyle = {
    border: '2px solid #d4af37',
    borderRadius: '8px',
    padding: '12px 15px',
    fontSize: '1.1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const searchLabelStyle = {
    color: '#d4af37',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '1.2rem',
    textAlign: 'center',
  };

  const resultsCountStyle = {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.1rem',
    fontStyle: 'italic',
  };

  return (
    <div style={pageStyle}>
      <Container>
        {/* Header Section */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>📦 Alaabta - Inventory Items 📦</h1>
          <p style={subtitleStyle}>Manage your restaurant inventory and track stock levels</p>
          <Link href="/inventory-items/new">
            <Button style={addButtonStyle}>➕ Add New Inventory Item</Button>
          </Link>
        </div>

        {/* Search Section */}
        <div style={searchContainerStyle}>
          <div style={searchLabelStyle}>🔍 Search Inventory Items</div>
          <input type="text" placeholder="Search by item name (e.g., Rice, Spices, Meat...)" value={searchTerm} onChange={handleSearchChange} style={searchInputStyle} className="form-control" />
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div style={resultsCountStyle}>
            Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} matching &ldquo;{searchTerm}&rdquo;
          </div>
        )}

        {/* Inventory Items Grid */}
        <Row className="g-4">
          {filteredItems.map((inventoryItem) => (
            <Col key={inventoryItem.id} lg={4} md={6} sm={12}>
              <InventoryCard inventoryObj={inventoryItem} cardSize="100%" onUpdate={getTheInventoryItems} />
            </Col>
          ))}
        </Row>

        {/* No Results Message */}
        {filteredItems.length === 0 && searchTerm && (
          <div
            style={{
              textAlign: 'center',
              color: '#ffffff',
              fontSize: '1.2rem',
              marginTop: '40px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              border: '2px solid #d4af37',
            }}
          >
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>🔍 No Items Found</h3>
            <p>
              No inventory items match your search for &ldquo;<strong>{searchTerm}</strong>&rdquo;
            </p>
            <p style={{ fontStyle: 'italic', marginTop: '10px' }}>Try searching with different keywords or check spelling</p>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && !searchTerm && (
          <div
            style={{
              textAlign: 'center',
              color: '#ffffff',
              fontSize: '1.2rem',
              marginTop: '40px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              border: '2px solid #d4af37',
            }}
          >
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>📦 No Inventory Items Yet</h3>
            <p>Start building your inventory by adding your first item!</p>
            <Link href="/inventory-items/new">
              <Button style={addButtonStyle} className="mt-3">
                ➕ Add Your First Item
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}

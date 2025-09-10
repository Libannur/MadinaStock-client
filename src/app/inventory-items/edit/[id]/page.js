'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Button, Container, Card, Col, Row } from 'react-bootstrap';
import { updateInventoryItem, getSingleInventoryItem } from '../../../../api/inventoryData';
import { getSuppliers } from '../../../../api/supplierData';
import { getCategories } from '../../../../api/categoryData';
import { useAuth } from '../../../../utils/context/authContext';

export default function EditInventoryItemPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    supplier: '',
    unit: '',
    price: '',
    notes: '',
  });

  // Load suppliers, categories, and existing item data
  useEffect(() => {
    const loadData = async () => {
      const [suppliersData, categoriesData] = await Promise.all([getSuppliers(), getCategories()]);

      setSuppliers(suppliersData);
      setCategories(categoriesData);

      if (id) {
        const item = await getSingleInventoryItem(id);

        // Find supplier ID if we have a supplier name
        let supplierValue = item.supplier || '';
        if (typeof item.supplier === 'string' && suppliersData.length > 0) {
          const foundSupplier = suppliersData.find((s) => s.name === item.supplier);
          if (foundSupplier) {
            supplierValue = foundSupplier.id;
          }
        }

        setFormData({
          name: item.name || '',
          description: item.description || '',
          supplier: supplierValue,
          unit: item.unit || '',
          price: item.price || '',
          notes: item.notes || '',
        });

        // Handle categories - convert names to IDs if needed
        if (item.categories && Array.isArray(item.categories)) {
          const categoryIds = item.categories
            .map((categoryItem) => {
              // If categoryItem is already a number (ID), use it
              if (typeof categoryItem === 'number') {
                return categoryItem;
              }
              // If categoryItem is a string (name), find the corresponding ID
              if (typeof categoryItem === 'string' && categoriesData.length > 0) {
                const foundCategory = categoriesData.find((c) => c.name === categoryItem);
                return foundCategory ? foundCategory.id : null;
              }
              return null;
            })
            .filter((catId) => catId !== null); // Remove null values

          setSelectedCategories(categoryIds);
        }
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((catId) => catId !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id,
      name: formData.name,
      description: formData.description,
      supplier: parseInt(formData.supplier, 10), // Convert to integer ID
      unit: formData.unit,
      price: parseFloat(formData.price) || null,
      notes: formData.notes,
      categories: selectedCategories.map((catId) => parseInt(catId, 10)), // Ensure categories are integers
      user_id: user.uid,
    };

    updateInventoryItem(payload).then(() => {
      router.push('/inventory-items');
    });
  };

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a472a 0%, #2d5016 50%, #1a472a 100%)',
    padding: '40px 0',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '3px solid #d4af37',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headerStyle = {
    color: '#1a472a',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  };

  const labelStyle = {
    color: '#1a472a',
    fontWeight: 'bold',
    marginBottom: '8px',
    fontSize: '1.1rem',
  };

  const inputStyle = {
    border: '2px solid #d4af37',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    backgroundColor: '#d4af37',
    border: '2px solid #d4af37',
    color: '#1a472a',
    fontWeight: 'bold',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  };

  const cancelButtonStyle = {
    backgroundColor: 'transparent',
    border: '2px solid #1a472a',
    color: '#1a472a',
    fontWeight: 'bold',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  };

  const decorativeStyle = {
    textAlign: 'center',
    color: '#d4af37',
    fontSize: '1.5rem',
    margin: '20px 0',
  };

  const categoryCheckboxStyle = {
    margin: '5px 10px 5px 0',
    padding: '8px 15px',
    border: '2px solid #d4af37',
    borderRadius: '20px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const categoryCheckedStyle = {
    ...categoryCheckboxStyle,
    backgroundColor: '#d4af37',
    color: '#1a472a',
    fontWeight: 'bold',
  };

  return (
    <div style={pageStyle}>
      <Container>
        <Card style={cardStyle}>
          {/* Decorative Top Border */}
          <div
            style={{
              height: '8px',
              background: 'linear-gradient(90deg, #d4af37, #f4e154, #d4af37)',
              width: '100%',
              borderRadius: '15px 15px 0 0',
            }}
          />

          <Card.Body style={{ padding: '40px' }}>
            <h1 style={headerStyle}>✏️ Edit Inventory Item ✏️</h1>

            <div style={decorativeStyle}>🍽️ ◆ 📦 ◆ 🍽️</div>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  {/* Item Name */}
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>📦 Item Name *</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} placeholder="Enter item name (e.g., Basmati Rice)" />
                  </Form.Group>

                  {/* Supplier Dropdown */}
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>🤝 Supplier *</Form.Label>
                    <Form.Select name="supplier" value={formData.supplier} onChange={handleChange} required style={inputStyle}>
                      <option value="">Select a supplier...</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Unit */}
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>📏 Unit *</Form.Label>
                    <Form.Control type="text" name="unit" value={formData.unit} onChange={handleChange} required style={inputStyle} placeholder="Enter unit (e.g., kg, lbs, pieces)" />
                  </Form.Group>

                  {/* Price */}
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>💰 Price</Form.Label>
                    <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} style={inputStyle} placeholder="Enter price (optional)" />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>📝 Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} style={inputStyle} placeholder="Describe the item..." />
                  </Form.Group>

                  {/* Notes */}
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>📋 Notes</Form.Label>
                    <Form.Control as="textarea" rows={3} name="notes" value={formData.notes} onChange={handleChange} style={inputStyle} placeholder="Any additional notes..." />
                  </Form.Group>
                </Col>
              </Row>

              {/* Categories Section */}
              <Form.Group className="mb-4">
                <Form.Label style={labelStyle}>🏷️ Categories (Select all that apply)</Form.Label>
                <div style={{ marginTop: '15px' }}>
                  {categories.map((category) => (
                    <label key={category.id} style={selectedCategories.includes(category.id) ? categoryCheckedStyle : categoryCheckboxStyle}>
                      <input type="checkbox" style={{ display: 'none' }} checked={selectedCategories.includes(category.id)} onChange={() => handleCategoryChange(category.id)} />
                      {category.name}
                    </label>
                  ))}
                </div>
                {categories.length === 0 && <p style={{ color: '#666', fontStyle: 'italic', marginTop: '10px' }}>No categories available. Create categories first to assign them to items.</p>}
              </Form.Group>

              <div style={decorativeStyle}>✦ ◆ ✦</div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
                <Button
                  type="button"
                  style={cancelButtonStyle}
                  onClick={() => router.push('/inventory-items')}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1a472a';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#1a472a';
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1a472a';
                    e.target.style.borderColor = '#1a472a';
                    e.target.style.color = '#d4af37';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#d4af37';
                    e.target.style.borderColor = '#d4af37';
                    e.target.style.color = '#1a472a';
                  }}
                >
                  ✏️ Update Inventory Item ✏️
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

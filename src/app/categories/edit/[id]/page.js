'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { getSingleCategory, updateCategory } from '../../../../api/categoryData';
import { useAuth } from '../../../../utils/context/authContext';

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getSingleCategory(id).then((category) => {
        setFormData({
          name: category.name || '',
          description: category.description || '',
        });
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: parseInt(id, 10),
      name: formData.name,
      description: formData.description,
      user_id: user.uid,
    };

    updateCategory(payload).then(() => {
      router.push('/categories');
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
    maxWidth: '600px',
    margin: '0 auto',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: '10px',
    border: '2px solid #d4af37',
  };

  const titleStyle = {
    color: '#1a472a',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontFamily: 'serif',
  };

  const subtitleStyle = {
    color: '#2d5016',
    fontSize: '1.1rem',
    fontStyle: 'italic',
    marginBottom: '0',
  };

  const labelStyle = {
    color: '#1a472a',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: '8px',
  };

  const inputStyle = {
    border: '2px solid #d4af37',
    borderRadius: '8px',
    fontSize: '1rem',
    padding: '12px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '30px',
  };

  const submitButtonStyle = {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
    color: '#1a472a',
    fontWeight: 'bold',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '8px',
  };

  const cancelButtonStyle = {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '8px',
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <Container>
          <div style={{ textAlign: 'center', color: '#d4af37', fontSize: '2rem' }}>🔄 Loading category data...</div>
        </Container>
      </div>
    );
  }

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
            }}
          />

          <Card.Body style={{ padding: '40px' }}>
            {/* Header */}
            <div style={headerStyle}>
              <h1 style={titleStyle}>✏️ Wax ka Bedel - Edit Category</h1>
              <p style={subtitleStyle}>Update the category information for your restaurant inventory</p>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label style={labelStyle}>📝 Category Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter category name (e.g., Beverages, Spices, Meats)" style={inputStyle} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={labelStyle}>📋 Description</Form.Label>
                <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} required placeholder="Describe this category and what items it includes..." style={inputStyle} />
              </Form.Group>

              {/* Action Buttons */}
              <div style={buttonContainerStyle}>
                <Button variant="primary" type="submit" style={submitButtonStyle}>
                  ✅ Update Category
                </Button>

                <Button variant="secondary" onClick={() => router.push('/categories')} style={cancelButtonStyle}>
                  ❌ Cancel
                </Button>
              </div>
            </Form>

            {/* Decorative Bottom Element */}
            <div
              style={{
                marginTop: '30px',
                textAlign: 'center',
                color: '#d4af37',
                fontSize: '1.2rem',
              }}
            >
              ✦ ◆ ✦
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

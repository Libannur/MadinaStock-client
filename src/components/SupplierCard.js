import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSingleSupplier } from '../api/supplierData';

export default function SupplierCard({ supplierObj, cardSize }) {
  const [supplierData, setSupplierData] = useState({});

  useEffect(() => {
    getSingleSupplier(supplierObj.id).then((supplier) => {
      setSupplierData(supplier);
    });
  }, [supplierObj]);

  return (
    <Card style={{ width: cardSize, backgroundColor: '#000000', color: '#ffffff' }}>
      <Card.Body>
        <Link passHref href={`suppliers/${supplierData.id}`}>
          <div className="link">
            <Card.Title>{supplierData.name}</Card.Title>
          </div>
        </Link>
        <Card.Text>
          <strong>Email:</strong> {supplierData.email}
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong> {supplierData.phone}
        </Card.Text>
        <Card.Text>
          <strong>Address:</strong> {supplierData.address}
        </Card.Text>
        <Card.Text>
          <strong>City:</strong> {supplierData.city}, {supplierData.state} {supplierData.zip_code}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

SupplierCard.propTypes = {
  supplierObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip_code: PropTypes.string,
  }).isRequired,
  cardSize: PropTypes.string.isRequired,
};

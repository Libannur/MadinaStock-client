'use client';

import { useEffect, useState } from 'react';
import { getSuppliers } from '../../api/supplierData';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);

  const getTheSuppliers = () => {
    getSuppliers().then(setSuppliers);
  };

  useEffect(() => {
    getTheSuppliers();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {suppliers.map((supplier) => (
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }} className="link">
          <span
            style={{
              width: '300px',
              fontSize: '22px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {supplier.name} {supplier.address} {supplier.city}, {supplier.state} {supplier.zip_code}
          </span>
        </div>
      ))}
    </div>
  );
}

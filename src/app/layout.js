import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// You can manage the metadata, tab content and info about your app dynamically using this. It will work on every page in your app:
export const generateMetadata = async ({ params }) => {
  // Destructure parameters or fetch necessary data here
  const { slug } = params; // Example of accessing dynamic route params

  const getPageTitle = (pageSlug) => {
    switch (pageSlug) {
      case 'suppliers':
        return 'Suppliers - MadinaStock';
      case 'categories':
        return 'Categories - MadinaStock';
      case 'inventory-items':
        return 'Inventory - MadinaStock';
      default:
        return 'MadinaStock - Somali Restaurant Management';
    }
  };

  return {
    title: getPageTitle(slug), // Proper titles for your restaurant app
    description: 'MadinaStock - Your authentic Somali restaurant inventory management system. Manage suppliers, categories, and track inventory efficiently.', // Professional description
    // Add other metadata fields as needed, like keywords, open graph tags, etc.
    keywords: ['restaurant', 'inventory', 'somali', 'stock management', 'suppliers', 'categories'],
    openGraph: {
      title: `MadinaStock - Somali Restaurant Management`,
      description: 'Authentic Somali restaurant inventory management system for tracking suppliers, categories, and stock levels.',
      url: 'https://madinastock.com',
    },
  };
};

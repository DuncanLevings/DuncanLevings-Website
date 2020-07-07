import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAdminDashPortfolio = lazy(() => import('./AdminDashPortfolio'));

const AdminDashPortfolio = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAdminDashPortfolio {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AdminDashPortfolio;

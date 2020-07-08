import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAdminIconModal = lazy(() => import('./AdminIconModal'));

const AdminIconModal = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAdminIconModal {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AdminIconModal;

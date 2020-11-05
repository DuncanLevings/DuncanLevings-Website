import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyEquipment = lazy(() => import('./Equipment'));

const Equipment = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyEquipment {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Equipment;

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyInventoryPreset = lazy(() => import('./InventoryPreset'));

const InventoryPreset = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyInventoryPreset {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default InventoryPreset;

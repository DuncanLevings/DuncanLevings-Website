import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazySlotFilter = lazy(() => import('./SlotFilter'));

const SlotFilter = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazySlotFilter {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default SlotFilter;

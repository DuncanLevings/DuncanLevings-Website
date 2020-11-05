import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazySlotSelector = lazy(() => import('./SlotSelector'));

const SlotSelector = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazySlotSelector {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default SlotSelector;

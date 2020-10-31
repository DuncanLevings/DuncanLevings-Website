import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyEditOrder = lazy(() => import('./EditOrder'));

const EditOrder = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyEditOrder {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default EditOrder;

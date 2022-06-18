import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyBronzeManMode = lazy(() => import('./BronzeManMode'));

const BronzeManMode = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyBronzeManMode {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default BronzeManMode;

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyBronzeMan = lazy(() => import('./BronzeMan'));

const BronzeMan = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyBronzeMan {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default BronzeMan;

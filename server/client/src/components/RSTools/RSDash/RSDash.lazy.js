import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyRSDash = lazy(() => import('./RSDash'));

const RSDash = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyRSDash {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default RSDash;

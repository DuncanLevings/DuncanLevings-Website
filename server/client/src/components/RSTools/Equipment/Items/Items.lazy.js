import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyItems = lazy(() => import('./Items'));

const Items = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyItems {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Items;

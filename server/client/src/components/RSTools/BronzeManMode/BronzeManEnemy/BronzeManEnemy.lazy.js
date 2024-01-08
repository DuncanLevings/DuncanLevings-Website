import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyBronzeManEnemy = lazy(() => import('./BronzeManEnemy'));

const BronzeManEnemy = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyBronzeManEnemy {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default BronzeManEnemy;

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPvmEnemy = lazy(() => import('./PvmEnemy'));

const PvmEnemy = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPvmEnemy {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PvmEnemy;

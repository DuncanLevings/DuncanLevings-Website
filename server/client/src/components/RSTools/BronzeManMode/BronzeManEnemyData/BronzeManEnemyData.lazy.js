import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyBronzeManEnemyData = lazy(() => import('./BronzeManEnemyData'));

const BronzeManEnemyData = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyBronzeManEnemyData {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default BronzeManEnemyData;

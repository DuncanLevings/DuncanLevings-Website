import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyFarmRun = lazy(() => import('./FarmRun'));

const FarmRun = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyFarmRun {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default FarmRun;

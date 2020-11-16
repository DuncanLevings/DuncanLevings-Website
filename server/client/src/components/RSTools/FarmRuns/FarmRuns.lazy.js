import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyFarmRuns = lazy(() => import('./FarmRuns'));

const FarmRuns = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyFarmRuns {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default FarmRuns;

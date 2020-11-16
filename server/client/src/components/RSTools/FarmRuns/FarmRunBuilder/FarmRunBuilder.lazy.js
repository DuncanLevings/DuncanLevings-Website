import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyFarmRunBuilder = lazy(() => import('./FarmRunBuilder'));

const FarmRunBuilder = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyFarmRunBuilder {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default FarmRunBuilder;

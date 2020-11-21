import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPvmBuilder = lazy(() => import('./PvmBuilder'));

const PvmBuilder = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPvmBuilder {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PvmBuilder;

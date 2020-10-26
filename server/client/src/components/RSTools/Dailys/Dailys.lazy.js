import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyDailys = lazy(() => import('./Dailys'));

const Dailys = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyDailys {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Dailys;

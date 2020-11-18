import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyMapSelection = lazy(() => import('./MapSelection'));

const MapSelection = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyMapSelection {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default MapSelection;

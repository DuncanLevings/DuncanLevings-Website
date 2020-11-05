import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPresets = lazy(() => import('./Presets'));

const Presets = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPresets {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Presets;

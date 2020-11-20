import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPresetSelector = lazy(() => import('./PresetSelector'));

const PresetSelector = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPresetSelector {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PresetSelector;

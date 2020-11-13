import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPresetViewer = lazy(() => import('./PresetViewer'));

const PresetViewer = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPresetViewer {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PresetViewer;

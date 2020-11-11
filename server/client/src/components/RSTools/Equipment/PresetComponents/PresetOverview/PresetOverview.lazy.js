import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPresetOverview = lazy(() => import('./PresetOverview'));

const PresetOverview = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPresetOverview {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PresetOverview;

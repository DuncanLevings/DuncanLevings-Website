import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPresetWizard = lazy(() => import('./PresetWizard'));

const PresetWizard = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPresetWizard {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PresetWizard;

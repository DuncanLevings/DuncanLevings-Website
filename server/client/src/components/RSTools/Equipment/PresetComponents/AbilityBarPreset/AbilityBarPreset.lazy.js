import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAbilityBarPreset = lazy(() => import('./AbilityBarPreset'));

const AbilityBarPreset = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAbilityBarPreset {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AbilityBarPreset;

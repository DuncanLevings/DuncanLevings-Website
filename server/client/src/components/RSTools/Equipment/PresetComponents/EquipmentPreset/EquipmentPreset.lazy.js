import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyEquipmentPreset = lazy(() => import('./EquipmentPreset'));

const EquipmentPreset = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyEquipmentPreset {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default EquipmentPreset;

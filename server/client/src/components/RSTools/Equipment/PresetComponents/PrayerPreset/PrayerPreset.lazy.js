import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPrayerPreset = lazy(() => import('./PrayerPreset'));

const PrayerPreset = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPrayerPreset {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PrayerPreset;

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyActivity = lazy(() => import('./Activity'));

const Activity = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyActivity {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Activity;

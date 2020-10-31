import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyEditDaily = lazy(() => import('./EditDaily'));

const EditDaily = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyEditDaily {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default EditDaily;

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAddDaily = lazy(() => import('./AddDaily'));

const AddDaily = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAddDaily {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AddDaily;

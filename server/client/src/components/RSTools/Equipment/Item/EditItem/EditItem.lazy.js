import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyEditItem = lazy(() => import('./EditItem'));

const EditItem = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyEditItem {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default EditItem;

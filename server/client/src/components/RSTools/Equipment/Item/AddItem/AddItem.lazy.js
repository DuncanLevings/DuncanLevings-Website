import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAddItem = lazy(() => import('./AddItem'));

const AddItem = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAddItem {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AddItem;

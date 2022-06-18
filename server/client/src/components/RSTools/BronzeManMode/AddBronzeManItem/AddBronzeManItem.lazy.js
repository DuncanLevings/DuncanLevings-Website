import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAddBronzeManItem = lazy(() => import('./AddBronzeManItem'));

const AddBronzeManItem = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAddBronzeManItem {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AddBronzeManItem;

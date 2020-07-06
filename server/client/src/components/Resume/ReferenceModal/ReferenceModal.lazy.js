import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyReferenceModal = lazy(() => import('./ReferenceModal'));

const ReferenceModal = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyReferenceModal {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ReferenceModal;

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyIFrameModal = lazy(() => import('./IFrameModal'));

const IFrameModal = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyIFrameModal {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default IFrameModal;

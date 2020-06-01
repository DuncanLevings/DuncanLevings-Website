import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyTemplateName = lazy(() => import('./TemplateName'));

const TemplateName = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyTemplateName {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default TemplateName;

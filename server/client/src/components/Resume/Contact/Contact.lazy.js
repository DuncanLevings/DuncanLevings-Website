import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyContact = lazy(() => import('./Contact'));

const Contact = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyContact {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Contact;

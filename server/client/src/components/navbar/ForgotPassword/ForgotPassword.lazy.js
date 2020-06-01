import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyForgotPassword = lazy(() => import('./ForgotPassword'));

const ForgotPassword = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyForgotPassword {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ForgotPassword;

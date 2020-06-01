import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazySignUp = lazy(() => import('./SignUp'));

const SignUp = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazySignUp {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default SignUp;

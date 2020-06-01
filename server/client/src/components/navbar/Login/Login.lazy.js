import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyLogin = lazy(() => import('./Login'));

const Login = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyLogin {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Login;

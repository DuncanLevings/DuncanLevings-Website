import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';

const LazyLogin = lazy(() => import('./Login'));

const Login = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div className="loading"><Spinner animation="border" variant="light" /></div>***REMOVED***>
      <LazyLogin ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default Login;

import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';

const LazyLogin = lazy(() => import('./Login'));

const Login = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div>Loading...</div>***REMOVED***>
      <LazyLogin ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default Login;

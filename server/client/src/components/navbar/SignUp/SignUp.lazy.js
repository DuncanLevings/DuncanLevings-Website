import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';

const LazySignUp = lazy(() => import('./SignUp'));

const SignUp = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div className="loading"><Spinner animation="border" variant="light" /></div>***REMOVED***>
      <LazySignUp ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default SignUp;

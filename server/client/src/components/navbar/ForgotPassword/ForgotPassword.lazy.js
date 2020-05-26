import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';

const LazyForgotPassword = lazy(() => import('./ForgotPassword'));

const ForgotPassword = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div className="loading"><Spinner animation="border" variant="light" /></div>***REMOVED***>
      <LazyForgotPassword ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default ForgotPassword;

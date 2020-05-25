import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';

const LazyRSDash = lazy(() => import('./RSDash'));

const RSDash = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div className="loading"><Spinner animation="border" /></div>***REMOVED***>
      <LazyRSDash ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default RSDash;

import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';

const LazyResumeHome = lazy(() => import('./ResumeHome'));

const ResumeHome = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div className="loading"><Spinner animation="border" /></div>***REMOVED***>
      <LazyResumeHome ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default ResumeHome;

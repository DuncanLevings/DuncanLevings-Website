import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import ***REMOVED*** Spinner ***REMOVED*** from 'react-bootstrap';

const LazyTemplateName = lazy(() => import('./TemplateName'));

const TemplateName = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div className="loading"><Spinner animation="border" /></div>***REMOVED***>
      <LazyTemplateName ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default TemplateName;

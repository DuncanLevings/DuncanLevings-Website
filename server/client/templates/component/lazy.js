import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';

const LazyTemplateName = lazy(() => import('./TemplateName'));

const TemplateName = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div>Loading...</div>***REMOVED***>
      <LazyTemplateName ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default TemplateName;

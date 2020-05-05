import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from '../../../errors/ErrorBoundary';

const LazynavbarMain = lazy(() => import('./navbarMain'));

const navbarMain = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div>Loading...</div>***REMOVED***>
      <LazynavbarMain ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default navbarMain;

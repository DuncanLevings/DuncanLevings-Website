import React, ***REMOVED*** lazy, Suspense ***REMOVED*** from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';

const LazyHome = lazy(() => import('./Home'));

const Home = props => (
  <ErrorBoundary>
    <Suspense fallback=***REMOVED***<div>Loading...</div>***REMOVED***>
      <LazyHome ***REMOVED***...props***REMOVED*** />
    </Suspense>
  </ErrorBoundary>
);

export default Home;

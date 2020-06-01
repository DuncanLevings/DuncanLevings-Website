import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';

const LazynavbarMain = lazy(() => import('./navbarMain'));

const navbarMain = props => (
  <ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <LazynavbarMain {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default navbarMain;

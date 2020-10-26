import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazySearchDaily = lazy(() => import('./SearchDaily'));

const SearchDaily = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazySearchDaily {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default SearchDaily;

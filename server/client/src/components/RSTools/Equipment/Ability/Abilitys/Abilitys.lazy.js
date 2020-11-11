import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAbilitys = lazy(() => import('./Abilitys'));

const Abilitys = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAbilitys {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Abilitys;

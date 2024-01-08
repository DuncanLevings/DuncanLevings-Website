import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAddBronzeManEnemy = lazy(() => import('./AddBronzeManEnemy'));

const AddBronzeManEnemy = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAddBronzeManEnemy {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AddBronzeManEnemy;

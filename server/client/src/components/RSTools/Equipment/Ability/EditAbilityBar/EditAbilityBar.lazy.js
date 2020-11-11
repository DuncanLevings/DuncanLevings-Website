import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyEditAbilityBar = lazy(() => import('./EditAbilityBar'));

const EditAbilityBar = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyEditAbilityBar {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default EditAbilityBar;

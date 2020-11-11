import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyAddAbilityBar = lazy(() => import('./AddAbilityBar'));

const AddAbilityBar = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyAddAbilityBar {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default AddAbilityBar;

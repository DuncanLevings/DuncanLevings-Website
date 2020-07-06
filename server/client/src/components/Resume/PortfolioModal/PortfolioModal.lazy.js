import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPortfolioModal = lazy(() => import('./PortfolioModal'));

const PortfolioModal = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPortfolioModal {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default PortfolioModal;

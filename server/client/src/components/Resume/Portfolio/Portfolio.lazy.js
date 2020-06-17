import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyPortfolio = lazy(() => import('./Portfolio'));

const Portfolio = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyPortfolio {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Portfolio;

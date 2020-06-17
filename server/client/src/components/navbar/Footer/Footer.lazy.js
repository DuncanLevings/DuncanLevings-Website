import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyFooter = lazy(() => import('./Footer'));

const Footer = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyFooter {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Footer;

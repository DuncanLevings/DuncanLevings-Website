import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyImgPreview = lazy(() => import('./ImgPreview'));

const ImgPreview = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyImgPreview {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ImgPreview;

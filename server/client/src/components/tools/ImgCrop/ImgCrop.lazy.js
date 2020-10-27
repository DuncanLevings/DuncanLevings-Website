import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyImgCrop = lazy(() => import('./ImgCrop'));

const ImgCrop = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyImgCrop {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default ImgCrop;

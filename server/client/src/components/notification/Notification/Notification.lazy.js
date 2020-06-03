import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'errors/ErrorBoundary';
import { Spinner } from 'react-bootstrap';

const LazyNotification = lazy(() => import('./Notification'));

const Notification = props => (
  <ErrorBoundary>
    <Suspense fallback={<div className="loading"><Spinner animation="border" variant="light" /></div>}>
      <LazyNotification {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Notification;

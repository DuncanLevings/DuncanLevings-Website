import React from 'react';
import ***REMOVED*** render ***REMOVED*** from '@testing-library/react';
import App from './App';

test('renders learn react link', () => ***REMOVED***
  const ***REMOVED*** getByText ***REMOVED*** = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
***REMOVED***);

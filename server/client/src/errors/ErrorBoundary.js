import React from 'react';

class ErrorBoundary extends React.Component ***REMOVED***
    constructor(props) ***REMOVED***
      super(props);
      this.state = ***REMOVED*** hasError: false ***REMOVED***;
    ***REMOVED***
  
    static getDerivedStateFromError(error) ***REMOVED***
      // Update state so the next render will show the fallback UI.
      return ***REMOVED*** hasError: true ***REMOVED***;
    ***REMOVED***
  
    componentDidCatch(error, errorInfo) ***REMOVED***
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    ***REMOVED***
  
    render() ***REMOVED***
      if (this.state.hasError) ***REMOVED***
        // You can render any custom fallback UI
        return <h1 style=***REMOVED******REMOVED***color: "white"***REMOVED******REMOVED***>Something went wrong.</h1>;
      ***REMOVED***
  
      return this.props.children; 
    ***REMOVED***
  ***REMOVED***

export default ErrorBoundary;
import React from 'react';
import ***REMOVED***
  BrowserRouter as Router
***REMOVED*** from "react-router-dom";
import NavBarMain from './components/navbar/navbarMain/navbarMain.lazy';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() ***REMOVED***
  return (
    <Router>
      <NavBarMain/>
      <div className="App">
        <header className="App-header">
          <p>
            my website
          </p>
        </header>
      </div>
    </Router>
  );
***REMOVED***

export default App;

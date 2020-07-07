import React from 'react';
import Router from 'Routes/Router';
import { ParallaxProvider } from 'react-scroll-parallax';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'App.scss';

function App() {
  return (
    <div className="App">
      <ParallaxProvider>
        <Router />
      </ParallaxProvider>
    </div>
  );
}

export default App;

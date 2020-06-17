/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';

class NotFound extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentDidMount() {
    }
  
    render() {
        return <h1 style={{color: "white", minHeight: "calc(100vh - 76px)"}}>Page not found.</h1>;
    }
  }

export default NotFound;
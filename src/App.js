// React imports
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

// Local project (JavaScript) imports
import asyncComponent from './hoc/asyncComponent';
import Page1 from './containers/Page1';

const AsyncPage2 = asyncComponent(() => {
    return import('./containers/Page2.js');
})

class App extends Component {
    render(){
        return (
            <div>
                <div>
                    <Link to="/">Homepage</Link> | <Link to="/page1">Page 1</Link> | <Link to="/page2">Page 2 (with image)</Link>
                </div>
                <div>
                    <Route path="/page1" exact component={Page1} />
                    <Route path="/page2" component={AsyncPage2} />
                </div>
            </div>
        );
    }
}

export default App;
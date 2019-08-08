// React imports
import React, { Component } from 'react';

// Local project (JavaScript) imports
import Page2Image from '../components/Page2Image/Page2Image';

// Local project (Stylesheet) imports
import '../scss/page2.scss';

class Page2 extends Component {
    render(){
        return (
            <div>
                <h1>Page2 (with image)</h1>
                <p>This container component is lazyloaded only when the route of /page2 is requested</p>
                <Page2Image />
            </div>
        );
    }
}

export default Page2;
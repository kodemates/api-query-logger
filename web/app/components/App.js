/**
 * Created by fherrero on 30/08/15.
 */

import React from 'react';
import {Link, RouteHandler} from 'react-router';
import '../../css/semantic/semantic.min.css';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                </header>
                <RouteHandler/>
            </div>
        );
    }
}

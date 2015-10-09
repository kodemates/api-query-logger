/**
 * Created by fherrero on 8/18/15.
 */
import React from 'react';
import Router from 'react-router';
import {NotFoundRoute, Route, Redirect, DefaultRoute} from 'react-router';
import alt from './lib/alt';
import App from './components/App';
import Headers from './components/Header/Headers';

let routes = (
    <Route handler={App} path="/">
        <DefaultRoute handler={Headers}/>
    </Route>
);

// Or, if you'd like to use the HTML5 history API for cleaner URLs:

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
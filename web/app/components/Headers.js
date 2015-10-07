/**
 * Created by fherrero on 30/08/15.
 */

import React from 'react';
import SocketStore from '../stores/SocketStore';
import SocketActions from '../actions/SocketActions';
import connectToStores from 'alt/utils/connectToStores';

class Headers extends React.Component {

    static getStores() {
        return [SocketStore];
    }

    static getPropsFromStores() {
        return SocketStore.getState();
    }

    componentDidMount() {
        SocketActions.startListening();
    }

    render() {
        let headers = this.props.headers.map((header, idx) => {
            return (
                <ul>
                    <li key={idx}>{header['Host']}</li>
                </ul>
            );
        });
        return (
            <div>
                {headers}
            </div>
        );
    }
}

export default connectToStores(Headers);

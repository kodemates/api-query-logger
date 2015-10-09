/**
 * Created by fherrero on 30/08/15.
 */

import React from 'react';
import SocketStore from '../../stores/SocketStore';
import SocketActions from '../../actions/SocketActions';
import connectToStores from '../../../../node_modules/alt/utils/connectToStores';
import pairs from '../../../../node_modules/lodash/object/pairs';
import HeaderRow from './HeaderRow';

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
            let rows = [];
            for (let k in header) {
                rows.push(
                    <HeaderRow header={k} value={header[k]}/>
                );
            }

            return rows;
        });
        return (
            <table className="ui compact table">
                <thead>
                <tr>
                    <th>Header</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {headers}
                </tbody>
            </table>
        );
    }
}

export default connectToStores(Headers);

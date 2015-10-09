/**
 * Created by fherrero on 09/10/15.
 */
import React from 'react';

export default class HeaderRow extends React.Component {
    render() {
        return (
            <tr key={this.props.header} className={this.props.header == 'Host' ? 'positive' : ''}>
                <td>{this.props.header}</td>
                <td>{this.props.value}</td>
            </tr>
        );
    }
}
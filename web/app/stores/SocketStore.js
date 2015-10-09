import alt from '../lib/alt';
import SocketActions from '../actions/SocketActions';

class SocketStore {
    constructor() {
        this.state = {
            headers: []
        };
        this.bindListeners({
            handleUpdateHeaders: SocketActions.UPDATE_HEADERS
        });

    }

    handleUpdateHeaders(header) {
        this.state.headers.push(header);
    }
}

export default alt.createStore(SocketStore, 'SocketStore');

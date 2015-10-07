import alt from '../lib/alt';
import  io from 'socket.io-client';

class SocketActions {
    startListening() {
        let socket = io.connect('http://localhost:3000');

        socket.on('send_session', (data) => {
            this.actions.updateHeaders(data.request.headers);
        });
    }

    updateHeaders(headers) {
        this.dispatch(headers);
    }
}

export default alt.createActions(SocketActions);

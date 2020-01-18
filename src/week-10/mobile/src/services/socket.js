import socketio from 'socket.io-client';
const socket = socketio('http://192.168.28.108:3333', {
    autoConnect: false,
});

function connect(longitude, latitude, techs) {
    socket.io.opts.query = {
        longitude,
            latitude,
            techs
    };
    socket.connect();
}

function subscribeToNewDevs(subscribeFuncion) {
    socket.on('new-dev', subscribeFuncion);
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};
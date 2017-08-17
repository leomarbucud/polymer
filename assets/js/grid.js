// var socket = new io.connect('http://127.0.0.1:3000');
const SOCKET_URL = (location.hostname == 'dev.thegrid.com') ? 'http://127.0.0.1:3000' : 'https://thegridsocket.azurewebsites.net';
var socket = new io.connect(SOCKET_URL);

const logger = str => {
  console.log('Socket: ', str);
};

socket.on('connect', () => {
  window.dispatchEvent(new CustomEvent('user:connected'));
});

window.addEventListener('user:connected', e => {
  logger('connected to socket');
});

window.addEventListener('user:posted', e => {
  const data = e.detail;
  socket.emit('user:posted', data);
});

socket.on('user:posted', data => {
  logger(data);
});

window.addEventListener('user:bidded', e => {
  const data = e.detail;
  socket.emit('user:bidded', data);
});

socket.on('user:bidded', data => {
  logger(data);
});
let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io();
  }
  return socket;
}

export function cleanupSocketListeners() {
  if (socket) {
    socket.removeAllListeners();
  }
}

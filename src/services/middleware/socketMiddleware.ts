import { Middleware } from 'redux';

type  SocketMiddlewareParams = {
  wsConnect: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsConnecting: string;
  wsDisconnect: string;
}


export const socketMiddleware = (wsActions: SocketMiddlewareParams): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect && typeof action.payload === 'string') {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }
      

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
          console.log('ws соединение установлено')
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: "Error" });
          console.log('Ошибка соединения')
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
          console.log('ws соединение закрыто')
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};

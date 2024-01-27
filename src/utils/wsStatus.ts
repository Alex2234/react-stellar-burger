export const WebsocketStatus  = {
    CONNECTING:  'CONNECTING...',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
  } as const;


  export type WebsocketStatusType = typeof WebsocketStatus[keyof typeof WebsocketStatus];


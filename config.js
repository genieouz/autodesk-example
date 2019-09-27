(function() {
    'use strict';
  
    module.exports = {
      'certif': 'Fc)SGzS3P2h,?x^%SH!~GC.2s-c~d-kWTenJC',
      'password': 'FMK9:H2yzJQr(3!R',
      'algorithm': 'aes-256-ctr',
      'credentials': {
        client_id: "4Q6CGwcbmLh7YQ13vSDmxaEYVJ4F1acR",
        client_secret: "ol1rMQ7DdPguU0I6",
        callback_url: "http://localhost:3000"

      },
      'scopes': {
          // Required scopes for the server-side application
          internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
          // Required scope for the client-side viewer
          public: ['viewables:read']
      }
    };
  })();
  
export const environment = {
  apiUrl: "https://localhost:7064",
  production: false,
  msalConfig: {
    auth: {
      clientId: '4bf34711-5ee1-40bf-9838-453fa5808856',
      authority: 'https://login.microsoftonline.com/3cbecb2a-7e57-40f6-aace-3835a870a361',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
}

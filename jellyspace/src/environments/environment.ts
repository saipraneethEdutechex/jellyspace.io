import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB0pTn_JbmqqMvuFLYDwWuPQNzCw_nWvdA',
    authDomain: 'jelly-space-ab5e0.firebaseapp.com',
    projectId: 'jelly-space-ab5e0',
    storageBucket: 'jelly-space-ab5e0.appspot.com',
    messagingSenderId: '241779132384',
    appId: '1:241779132384:web:0d93c77f18221eb8d38d85',
  },
  frontendUrl: 'http://localhost:4200', // Frontend base URL for development
  backendUrl: 'http://localhost:3000', // Backend base URL for development
  domainUrl: '', // Not used in development
};

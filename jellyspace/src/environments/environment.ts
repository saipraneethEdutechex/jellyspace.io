import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyB0pTn_JbmqqMvuFLYDwWuPQNzCw_nWvdA',
    authDomain: 'jelly-space-ab5e0.firebaseapp.com',
    projectId: 'jelly-space-ab5e0',
    storageBucket: 'jelly-space-ab5e0.appspot.com',
    messagingSenderId: '241779132384',
    appId: '1:241779132384:web:0d93c77f18221eb8d38d85',
  },
  frontendUrl: 'http://54.189.27.176:4200', // Frontend base URL for development
  backendUrl: 'http://54.189.27.176:3000', // Backend base URL for development
  domainUrl: '', // Not used in development
  // frontendUrl: 'https://onboarding.jellyspace.io',
  // backendUrl: 'https://onboarding.jellyspace.io',
  // domainUrl: 'https://onboarding.jellyspace.io',
};

// src/environments/environment.interface.ts

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface Environment {
  production: boolean;
  firebase?: FirebaseConfig; // Optional because it may not be present in the production environment
}

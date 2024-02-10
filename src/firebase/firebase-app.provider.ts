import { Injectable, Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseApp, initializeApp, FirebaseOptions } from 'firebase/app';

@Injectable()
export class FirebaseAppProvider {
  private firebaseAdmin: admin.app.App;
  private firebaseApp: FirebaseApp;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async initializeFirebaseAdmin(): Promise<admin.app.App> {
    if (!this.firebaseAdmin) {
      const firebaseConfig: admin.ServiceAccount = {
        type: this.configService.get('TYPE'),
        project_id: this.configService.get<string>('PROJECT_ID'),
        private_key_id: this.configService.get<string>('PRIVATE_KEY_ID'),
        private_key: this.configService.get<string>('PRIVATE_KEY'),
        client_email: this.configService.get<string>('CLIENT_EMAIL'),
        client_id: this.configService.get<string>('CLIENT_ID'),
        auth_uri: this.configService.get<string>('AUTH_URI'),
        token_uri: this.configService.get<string>('TOKEN_URI'),
        auth_provider_x509_cert_url:
          this.configService.get<string>('AUTH_CERT_URL'),
        client_x509_cert_url: this.configService.get<string>('CLIENT_CERT_URL'),
        universe_domain: this.configService.get<string>('UNIVERSAL_DOMAIN'),
      } as admin.ServiceAccount;

      try {
        this.firebaseAdmin = admin.initializeApp({
          credential: admin.credential.cert(firebaseConfig),
          databaseURL: this.configService.get('DATABASE_URL'),
          storageBucket: this.configService.get('STORAGE_BUCKET'),
        });
      } catch (error) {
        console.error('Error initializing Firebase Admin:', error);
        throw new Error('Failed to initialize Firebase admin app');
      }
    }
    return this.firebaseAdmin;
  }
  async initializeFirebaseApp(): Promise<FirebaseApp> {
    if (!this.firebaseApp) {
      const firebaseConfig: FirebaseOptions = {
        apiKey: this.configService.get('API_KEY'),
        authDomain: this.configService.get('AUTH_DOMAIN'),
        databaseURL: this.configService.get('DATABASE_URL'),
        projectId: this.configService.get('PROJECT_ID'),
        storageBucket: this.configService.get('STORAGE_BUCKET'),
        messagingSenderId: this.configService.get('SENDER_ID'),
        appId: this.configService.get('APP_ID'),
        measurementId: this.configService.get('MEASUREMENT_ID'),
      };
      try {
        this.firebaseApp = initializeApp(firebaseConfig, 'firebaseApp');
      } catch (error) {
        console.error('Error initializing Firebase app:', error);
        throw new Error('Failed to initialize Firebase app');
      }
    }
    return this.firebaseApp;
  }
}

export const firebaseAdminProvider: Provider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: async (firebaseAppProvider: FirebaseAppProvider) =>
    await firebaseAppProvider.initializeFirebaseAdmin(),
  inject: [FirebaseAppProvider],
};

export const firebaseAppProvider: Provider = {
  provide: 'FIREBASE_APP',
  useFactory: async (firebaseAppProvider: FirebaseAppProvider) =>
    await firebaseAppProvider.initializeFirebaseApp(),
  inject: [FirebaseAppProvider],
};

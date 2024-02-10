import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAppProvider, firebaseAdminProvider, firebaseAppProvider } from "./firebase-app.provider";
import { FirebaseAppRepository } from './firebase-app.repository';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  providers: [
    firebaseAdminProvider,
    firebaseAppProvider,
    ConfigService,
    FirebaseAppProvider,
    FirebaseAppRepository,
  ],
  exports: [FirebaseAppRepository, 'FIREBASE_APP', 'FIREBASE_ADMIN'],
})
export class FirebaseAppModule {}

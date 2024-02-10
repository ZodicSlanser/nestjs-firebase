import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStartegy } from './auth/strategy/jwt.startegy';
import { FirebaseAppModule } from './firebase/firebase-app.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), FirebaseAppModule],
  controllers: [AppController],
  providers: [AppService, JwtStartegy],
})
export class AppModule {}

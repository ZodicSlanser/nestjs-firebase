import { Injectable } from '@nestjs/common';
import { FirebaseAppRepository } from './firebase/firebase-app.repository';
import { UserEntity, UserLoginEntity } from './entites/user.entity';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable()
export class AppService {
  constructor(private readonly firebaseAppRepository: FirebaseAppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signIn(user: UserLoginEntity) {
    try {
      await signInWithEmailAndPassword(
        this.firebaseAppRepository.authInstance,
        user.email,
        user.password,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Successfully signed in user:', user);
        })
        .catch((error) => {
          console.error('Error signing in user:', error);
          return 'Error signing in user:' + error;
          throw error;
        });
    } catch (error) {
      console.error('Error signing in user:', error);
      return 'Error signing in user:' + error;
      throw error;
    }
    await this.firebaseAppRepository.auth
      .getUserByEmail(user.email)
      .then((userRecord) => {
        this.firebaseAppRepository.authInstance.currentUser
          .getIdToken()
          .then((idToken) => {
            console.log(
              'Successfully signed in user:',
              userRecord.uid,
              idToken,
            );
            return idToken;
          });
      });
  }

  async signOut() {
    try {
      const result = await signOut(this.firebaseAppRepository.authInstance);
      console.log('Successfully signed out user:', result);
    } catch (error) {
      console.error('Error signing out user:', error);
      throw error;
    }
  }
  async signUp(user: UserEntity) {
    try {
      const userRecord = await this.firebaseAppRepository.auth.createUser(user);
      console.log('Successfully created new user:', userRecord.uid);
    } catch (error) {
      console.error('Error creating new user:', error);
      throw error;
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { app, auth } from 'firebase-admin';
import { getAuth, Auth as AuthInstance } from 'firebase/auth';

@Injectable()
export class FirebaseAppRepository {
  public readonly db: FirebaseFirestore.Firestore;
  public readonly collection?: FirebaseFirestore.CollectionReference;
  public readonly authInstance: AuthInstance;
  public readonly auth: auth.Auth;
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: app.App,
    @Inject('FIREBASE_APP') private readonly firebaseApp: any,
  ) {
    this.db = firebaseAdmin ? firebaseAdmin.firestore() : app().firestore();
    this.collection = this.db.collection('users');
    this.authInstance = getAuth(this.firebaseApp);
    this.auth = firebaseAdmin.auth();
  }
}

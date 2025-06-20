import {FirebaseApp, initializeApp} from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import config from '../config'
import { Auth, getAuth } from 'firebase/auth';

interface FirebaseConfig {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;
}

const app = initializeApp(config.firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);

const firebaseConfig: FirebaseConfig = {
    app,
    db,
    auth
};
export default firebaseConfig;
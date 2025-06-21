import {FirebaseApp, initializeApp} from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import config from '../config'
import { Auth, getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

interface FirebaseConfig {
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;
}

const app = initializeApp(config.firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);

// Configurar la persistencia de autenticación para el navegador
setPersistence(auth, browserLocalPersistence)

const firebaseConfig: FirebaseConfig = {
    app,
    db,
    auth
};
export default firebaseConfig;
export type { FirebaseConfig };
export { app, db, auth };
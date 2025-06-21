
interface AppConfig {
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    };
}

const config: AppConfig = {
    firebaseConfig: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
        authDomain: "monkey-sports-85a19.firebaseapp.com",
        projectId: "monkey-sports-85a19",
        storageBucket: "monkey-sports-85a19.firebasestorage.app",
        messagingSenderId: "117475994782",
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    },
}

export default config;
export type { AppConfig };
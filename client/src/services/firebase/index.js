import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { serviceConfig } from '@/config';

const config = {
  apiKey: serviceConfig.firebase.apiKey,
  authDomain: serviceConfig.firebase.authDomain,
  databaseURL: serviceConfig.firebase.databaseURL,
  projectId: serviceConfig.firebase.projectId,
  storageBucket: serviceConfig.firebase.storageBucket,
  messagingSenderId: serviceConfig.firebase.messagingSenderId,
};

const firebase = firebaseApp.initializeApp(config);
const settings = { timestampsInSnapshots: true };

firebaseApp.firestore().settings(settings);

export default firebase;

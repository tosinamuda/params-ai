import admin from "firebase-admin";
import {ServiceAccount} from "firebase-admin/lib/credential"
import firebaseCredentials from "./firebase-key.json"


const serviceAccount = firebaseCredentials as ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export default admin;

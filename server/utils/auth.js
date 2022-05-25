require("dotenv").config();
var admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY.replace(
  /\\\\n/g,
  "\n"
);
console.log(firebasePrivateKey);

// Convert string to json and unescape newlines and quotes
const authKey = {
  type: "service_account",
  project_id: "idea-editor",
  private_key_id: "cb8421d6e9e7f4b398230908ef882baed9a8bcac",
  private_key: firebasePrivateKey,
  client_email: "firebase-adminsdk-y3rjh@idea-editor.iam.gserviceaccount.com",
  client_id: "117241962763081798437",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y3rjh%40idea-editor.iam.gserviceaccount.com",
};

class Auth {
  constructor() {
    throw new Error("Use Auth.getInstance()");
  }
  static getInstance() {
    if (!Auth.instance) {
      admin.initializeApp({
        credential: admin.credential.cert(authKey),
      });

      Auth.instance = getAuth();
    }
    return Auth.instance;
  }
}

module.exports = Auth;

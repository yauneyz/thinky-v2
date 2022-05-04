var admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const authKey = require("../firebase-key.json");

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

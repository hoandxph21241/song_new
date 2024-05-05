const admin = require('firebase-admin');
const serviceAccount = require('/path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '/path/to/serviceAccountKey.json',
});

const db = admin.firestore(); // Lấy tham chiếu đến Firestore
const storage = admin.storage(); // Lấy tham chiếu đến Firebase Storage

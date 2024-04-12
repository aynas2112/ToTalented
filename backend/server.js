const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./totalentedcenteroflearning-firebase-adminsdk-9nznb-5a45b7bb0a.json'); // Replace with your Firebase Admin SDK JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000/register', credentials: true }));
app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: username,
      password: password,
    });

    // You can save additional user data to Firestore or Realtime Database here if needed
    // Example Firestore usage:
    // await admin.firestore().collection('users').doc(userRecord.uid).set({ username });

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.json({ message: 'Registration successful', uid: userRecord.uid });
  } catch (error) {
    console.error(error);

    // Firebase Auth error codes: https://firebase.google.com/docs/auth/admin/errors
    if (error.code === 'auth/email-already-exists') {
      res.status(409).json({ error: 'Username already taken' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

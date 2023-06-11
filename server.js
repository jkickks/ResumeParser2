const express = require('express');
const app = express();
const multer = require('multer');
const pdf = require('pdf-parse');
const firebaseConfig = require('./firebaseConfig');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');
initializeApp({
  credential: cert(serviceAccount)
});
  
const db = getFirestore()


// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Endpoint for handling file upload
app.post('/upload', upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const buffer = req.file.buffer;
    pdf(buffer)
        .then(async data => {
            const text = data.text;
            // Do further processing with the extracted text
            // You can store it in a database, perform analysis, etc.

            res.send(text);
            const collectionRef = db.collection('resumes');
            console.log(collectionRef)

            // Store the extracted text in Firestore
            const newDoc = db.collection('resumes').doc('testing123');

            await newDoc.set({
                text: text,
            });

        })
        .catch(error => {
            console.error('Error parsing PDF:', error);
            res.status(500).send('Error parsing PDF.');
        });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



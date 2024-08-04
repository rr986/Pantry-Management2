const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const client = new vision.ImageAnnotatorClient();

// Adding a simple comment to force deployment
exports.classifyImage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { imageUrl } = req.body;
    try {
      const [result] = await client.labelDetection(imageUrl);
      const labels = result.labelAnnotations;
      res.status(200).send(labels);
    } catch (error) {
      console.error('Error classifying image:', error);
      res.status(500).send(error);
    }
  });
});

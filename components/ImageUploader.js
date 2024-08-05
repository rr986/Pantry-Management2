import React, { useState } from 'react';
import axios from 'axios';
import { auth, storage } from '../Firebase'; // Update the path if necessary
import firebase from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core';

const ImageUploader = ({ addItem }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${image.name}`);
    await imageRef.put(image);
    const imageUrl = await imageRef.getDownloadURL();

    try {
      const response = await axios.post('https://us-central1-pantry-management-cb281.cloudfunctions.net/classifyImage', { imageUrl });
      const classifiedLabels = response.data;

      // Filter out general descriptors
      const filteredLabels = classifiedLabels.filter(label =>
        !["Food", "Fruit", "Staple food", "Natural foods", "Superfood", "Seedless fruit", "Rose family"].includes(label.description)
      );

      // Find the label with the highest score
      const highestScoreLabel = filteredLabels.reduce((prev, current) => (prev.score > current.score) ? prev : current, {});

      setLabels(classifiedLabels);
      if (highestScoreLabel.description) {
        addItem({ name: highestScoreLabel.description, quantity: 1 }); // Assuming quantity is 1 for classified items
      } else {
        console.error('No valid labels found.');
      }
    } catch (error) {
      console.error('Error classifying image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField type="file" onChange={handleImageChange} />
        <Button type="submit" variant="contained" color="primary">
          {loading ? <CircularProgress size={24} /> : 'Upload and Classify'}
        </Button>
      </form>
      {labels.length > 0 && (
        <div>
          <Typography variant="h6">Classified Labels:</Typography>
          <ul>
            {labels.map((label, index) => (
              <li key={index}>{label.description} (Confidence: {label.score.toFixed(2)})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;


import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import { storage } from '../firebase'; // Import the storage instance
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ImageUploader = ({ addItem }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.error('No image selected.');
      return;
    }

    setLoading(true);

    try {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const response = await axios.post(
        'https://us-central1-pantry-management-cb281.cloudfunctions.net/classifyImage',
        { imageUrl }
      );
      const classifiedLabels = response.data;

      const filteredLabels = classifiedLabels.filter(label =>
        !["Food", "Fruit", "Staple food", "Natural foods", "Superfood", "Seedless fruit", "Rose family"].includes(label.description)
      );

      const highestScoreLabel = filteredLabels.reduce(
        (prev, current) => (prev.score > current.score ? prev : current),
        {}
      );

      setLabels(classifiedLabels);

      if (highestScoreLabel.description) {
        addItem({ name: highestScoreLabel.description, quantity: 1 });
      } else {
        console.warn('No valid labels found.');
      }
    } catch (error) {
      console.error('Error uploading or classifying image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField type="file" onChange={handleImageChange} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload and Classify'}
        </Button>
      </form>
      {labels.length > 0 && (
        <div>
          <Typography variant="h6">Classified Labels:</Typography>
          <ul>
            {labels.map((label, index) => (
              <li key={index}>
                {label.description} (Confidence: {label.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;


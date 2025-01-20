import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';

const RecipeSuggestion = ({ items }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: `Suggest recipes based on these pantry items: ${items.map(item => item.name).join(', ')}`,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
      const recipeText = response.data.choices[0].text.trim();
      const recipeList = recipeText.split('\n').filter(recipe => recipe);
      setRecipes(recipeList);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button onClick={fetchRecipes} variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        Suggest Recipes
      </Button>
      <Typography variant="h6">Suggested Recipes:</Typography>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSuggestion;

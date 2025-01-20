import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, CircularProgress } from '@material-ui/core';

const RecipeSuggestion = ({ items }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      console.error('Missing OpenAI API key');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            {
              role: 'user',
              content: `List only recipes based on these pantry items: ${items.map(item => item.name).join(', ')}. Do not include introductions, explanations, or any additional text—just a numbered list of recipes.`,
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );

      const recipeText = response.data.choices[0].message.content.trim();

      // Process recipe text into a clean list
      const recipeList = recipeText
        .split('\n')
        .filter(recipe => recipe.trim()) // Remove empty lines
        .map(recipe => recipe.replace(/^\d+\.\s*/, '')); // Remove numbering if present

      setRecipes(recipeList);
    } catch (error) {
      console.error('Error fetching recipes:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button
        onClick={fetchRecipes}
        variant="contained"
        color="primary"
        style={{ marginBottom: '10px' }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Suggest Recipes'}
      </Button>
      {recipes.length > 0 && (
        <div>
          <Typography variant="h6">Suggested Recipes:</Typography>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeSuggestion;

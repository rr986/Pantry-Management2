import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ItemList from '../components/ItemList';
import AddItemForm from '../components/AddItemForm';
import SearchBar from '../components/SearchBar';
import RecipeSuggestion from '../components/RecipeSuggestion';
import { Container, Typography, Divider } from '@material-ui/core';

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const editItem = (index) => {
    const name = prompt("Enter new name", items[index].name);
    const quantity = prompt("Enter new quantity", items[index].quantity);
    const newItems = items.map((item, i) =>
      i === index ? { name, quantity } : item
    );
    setItems(newItems);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      {/* Title Section */}
      <div style={{
        background: 'linear-gradient(90deg, #4caf50, #81c784)',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          style={{
            color: 'white',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          Pantry Management
        </Typography>
      </div>
      <Divider style={{ marginBottom: '20px' }} />

      {/* Search Bar */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Add Item Form */}
      <AddItemForm onAdd={addItem} />

      {/* Item List */}
      <ItemList items={filteredItems} onDelete={deleteItem} onEdit={editItem} />

      {/* Image Uploader */}
      <ImageUploader addItem={addItem} />

      {/* Recipe Suggestions */}
      <RecipeSuggestion items={items} />
    </Container>
  );
};

export default Home;

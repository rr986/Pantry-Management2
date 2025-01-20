import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ItemList from '../components/ItemList';
import AddItemForm from '../components/AddItemForm';
import SearchBar from '../components/SearchBar';
import RecipeSuggestion from '../components/RecipeSuggestion';
import { Container, Typography } from '@material-ui/core';

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
      <Typography variant="h4" gutterBottom>
        Pantry Management
      </Typography>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <AddItemForm onAdd={addItem} />
      <ItemList items={filteredItems} onDelete={deleteItem} onEdit={editItem} />
      <ImageUploader addItem={addItem} />
      <RecipeSuggestion items={items} />
    </Container>
  );
};

export default Home;

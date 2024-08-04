// MainComponent.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
import ImageUploader from './ImageUploader';
import { Container, Typography } from '@material-ui/core';

const MainComponent = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleEditItem = (index) => {
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
      <AddItemForm onAdd={handleAddItem} />
      <ItemList items={filteredItems} onDelete={handleDeleteItem} onEdit={handleEditItem} />
      <ImageUploader />
    </Container>
  );
};

export default MainComponent;

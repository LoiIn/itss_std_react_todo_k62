import { useState, useEffect } from 'react';
import { addItemIntoFirebase, updateItemInFirebase, getItemsFromFirebase, clearItemFromFirebase } from "../lib/firebase";

function useFbStorage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const _items = await getItemsFromFirebase();
    setItems(_items);
  };

  const addItem = async item => {
    const newItem = { text: item.text, done: item.done };
    await addItemIntoFirebase(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async checked => {
    const changes = { done: !checked.done };
    await updateItemInFirebase(changes, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes}
      }
      return item;
    })
    setItems(newItems);
  }

  const clearItems = () => {
    items.map(item => {
      clearItemFromFirebase(item);
    })
    setItems([]);
  };

  return [items, addItem, updateItem, clearItems];
}

export default useFbStorage;  

import { useState } from "react";
import Logo from "./Logo";
import Stats from "./Stats";
import PackingList from "./PackingList";
import Form from "./Form";

function App() {
  const [items, setItems] = useState([]);

  function onAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function onDeleteItem(item) {
    setItems((items) => items.filter((el) => el.id !== item.id));
  }

  function onClearItems() {
    if (items.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  function onPack(id) {
    console.log("ID is", id);

    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItem={onAddItem}></Form>
      <PackingList
        items={items}
        onDeleteItem={onDeleteItem}
        onClearItems={onClearItems}
        onPack={onPack}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

export default App;

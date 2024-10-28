import { useState } from "react";

export default function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) {
      console.log("No description, returning...");
      return;
    }

    const newItem = {
      description,
      quantity,
      id: Date.now(),
      packed: false,
    };

    console.log({ newItem });

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

import React, { useState } from "react";
import "./App.css";

function Todo() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  function addItem() {
    setItems([...items, { text: input, priority: 1 }]);
    setInput("");
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function updatePriority(index, delta) {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, priority: item.priority + delta } : item
      )
    );
  }

  function sortItems() {
    setItems([...items].sort((a, b) => b.priority - a.priority));
  }

  return (
    <div className="App">
      <h1>Wish List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="add-item-button" onClick={addItem}>
        Enter
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.text} - Priority: {item.priority}
            <button className="delete-icon" onClick={() => removeItem(index)}>
              &#x1F5D1;
            </button>
            <button onClick={() => updatePriority(index, 1)}>&#x2191;</button>
            <button onClick={() => updatePriority(index, -1)}>&#x2193;</button>
          </li>
        ))}
      </ul>
      <button className="sort-button" onClick={sortItems}>
        Sort
      </button>
    </div>
  );
}

export default Todo;

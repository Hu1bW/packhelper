import { useState } from "react";

function App() {
  const [items, setItems] = useState<string[]>([]);

  return (
    <div className="app">
      <h1>PackHelper 🎒</h1>
      <p>Jouw assistent voor backpack- en bikepackreizen.</p>
      <ul>
        {items.length === 0 ? (
          <li>Nog geen items toegevoegd</li>
        ) : (
          items.map((item, i) => <li key={i}>{item}</li>)
        )}
      </ul>
    </div>
  );
}

export default App;

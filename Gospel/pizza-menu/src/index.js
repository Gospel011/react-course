import React from "react";
import ReactDOM from "react-dom/client";
import pizzas from "./data";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      <ul className="pizzas">
        {pizzas.map((pizza) => {
          return <Pizza key={pizza.name} pizza={pizza}></Pizza>;
        })}
      </ul>
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;
  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()}. We're currently{" "}
      {isOpen ? "open" : "closed"}
    </footer>
  );
}

function Pizza(props) {
  const { name, ingredients, price, photoName } = props.pizza;
  return (
    <li className="pizza">
      <img src={photoName} alt={name}></img>
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{price + 3}</span>
      </div>
    </li>
  );
}

// Render react app

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

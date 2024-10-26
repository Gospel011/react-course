const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const step = 3;
  return (
    <div className="steps">
      <div className="numbers">
        {messages.map((el, index) => (
          <div className={step >= index + 1 ? "active" : ""}>{index + 1}</div>
        ))}
      </div>

      <p className="message">Hello</p>

      <div className="buttons">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default App;

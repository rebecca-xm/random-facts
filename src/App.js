import { useState, useEffect } from "react";
import './App.css';
import RandomFacts from './components/Facts';

const facts = [];

function App() {
  const [Fact, setFact] = useState(facts);

  useEffect(() => {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
      .then((response) => response.json())
      .then((data) => setFact(data));
  }, []);

  return (
    <div className="App">
      <h1>Random useless facts generator</h1>
      <RandomFacts data={Fact}/>
    </div>
  );
};

export default App;

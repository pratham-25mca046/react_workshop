import { useState, useEffect } from 'react'
import './App.css'

function App(){
  const API_URL = 'https://uselessfacts.jsph.pl/random.json?language=en';
  
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error fetching fact:', error);
      setFact('Failed to load fact');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return(
    <div className="container">
      <h1>✨ Fun Facts</h1>
      <div className="fact-box">
        <p className={loading ? 'loading' : 'fact-text'}>
          {loading ? 'Loading...' : (fact || 'Click the button to get started!')}
        </p>
      </div>
      <button onClick={fetchFact} disabled={loading}>
        {loading ? 'Loading...' : '🎲 Get New Fact'}
      </button>
    </div>
  );
}

export default App; 
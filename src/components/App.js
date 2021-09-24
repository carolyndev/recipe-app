import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Main from './Main';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  function clearAll() {
    setRecipes([]);
    setSearch('');

    const inputField = document.querySelector('#input-text');
    inputField.value = '';
    console.log(inputField);
  }
  return (
    <Router>
      <div className="App">
        <Header
          clearAll={clearAll}
          recipes={recipes}
          setRecipes={setRecipes}
          search={search}
          setSearch={setSearch}
        />
        <Main
          clearAll={clearAll}
          recipes={recipes}
          setRecipes={setRecipes}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </Router>
  );
};

export default App;

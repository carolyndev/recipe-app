import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import RecipeDetails from './RecipeDetails';
import Favorites from './Favorites';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const clearResults = () => {
    setRecipes([]);
    setSearch('');
    setShowForm(true);
    const inputField = document.querySelector('#input-text');
    inputField.value = '';
  };

  const hideForm = () => {
    setRecipes([]);
    setSearch('');
    setShowForm(false);
  };

  return (
    <Router>
      <div className="App">
        <Header
          clearResults={clearResults}
          hideForm={hideForm}
          recipes={recipes}
          setRecipes={setRecipes}
          search={search}
          setSearch={setSearch}
          showForm={showForm}
          setShowForm={setShowForm}
        />
        <Main
          clearResults={clearResults}
          showForm={showForm}
          setShowForm={setShowForm}
          loading={loading}
          setLoading={setLoading}
          recipes={recipes}
          setRecipes={setRecipes}
          search={search}
          setSearch={setSearch}
        />
      </div>

      <Switch>
        <Route path="/recipe/:id" exact component={RecipeDetails} />
        <Route path="/favorites">
          <Favorites showForm={showForm} setShowForm={setShowForm} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import RecipeDetails from './RecipeDetails';
import Favorites from './Favorites';
import Surprise from './Surprise';

const API_KEY = '50aa27339ac74c17a68aefe745b2be28';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showRecipes, setShowRecipes] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [uniqueFavorites, setUniqueFavorites] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getLocalFavorites();
    getLocalRecipes();
  }, []);

  useEffect(() => {
    saveLocalFavorites();
  }, [favorites]);

  useEffect(() => {
    saveLocalRecipes();
  }, [recipes]);

  const returnHome = () => {
    setSearch('');
    setShowForm(true);
    const inputField = document.querySelector('#input-text');
    if (inputField) {
      inputField.value = '';
    }
  };

  const saveLocalFavorites = () => {
    const filteredFavorites = Array.from(
      new Set(favorites.map(JSON.stringify))
    ).map(JSON.parse);

    const unique = filteredFavorites.filter((item, index, array) => {
      return (
        array.findIndex((t) => t.id === item.id && t.title === item.title) ===
        index
      );
    });
    setUniqueFavorites(unique);
    localStorage.setItem('favorites', JSON.stringify(unique));
  };

  const getLocalFavorites = () => {
    if (localStorage.getItem('favorites') === null) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } else {
      let favoritesLocal = JSON.parse(localStorage.getItem('favorites'));
      setFavorites(favoritesLocal);
    }
  };

  const saveLocalRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  };

  const getLocalRecipes = () => {
    if (localStorage.getItem('recipes') === null) {
      localStorage.setItem('recipes', JSON.stringify([]));
    } else {
      let recipesLocal = JSON.parse(localStorage.getItem('recipes'));
      setRecipes(recipesLocal);
    }
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header
          returnHome={returnHome}
          counter={counter}
          setCounter={setCounter}
        />
        <Main
          API_KEY={API_KEY}
          favorites={favorites}
          setFavorites={setFavorites}
          returnHome={returnHome}
          showForm={showForm}
          setShowForm={setShowForm}
          loading={loading}
          setLoading={setLoading}
          recipes={recipes}
          setRecipes={setRecipes}
          search={search}
          setSearch={setSearch}
          showRecipes={showRecipes}
          setShowRecipes={setShowRecipes}
        />
      </div>

      <Switch>
        <Route
          path="/recipe/:id"
          exact
          render={(props) => (
            <RecipeDetails
              {...props}
              recipes={recipes}
              API_KEY={API_KEY}
              setShowForm={setShowForm}
              setFavorites={setFavorites}
              recipeLoading={recipeLoading}
              setRecipeLoading={setRecipeLoading}
              saveLocalFavorites={saveLocalFavorites}
              getLocalRecipes={getLocalRecipes}
              saveLocalRecipes={saveLocalRecipes}
            />
          )}
        />
        <Route path="/favorites">
          <Favorites
            returnHome={returnHome}
            setShowForm={setShowForm}
            setFavorites={setFavorites}
            setRecipes={setRecipes}
            uniqueFavorites={uniqueFavorites}
          />
        </Route>
        <Route path="/surprise">
          <Surprise
            API_KEY={API_KEY}
            saveLocalFavorites={saveLocalFavorites}
            counter={counter}
            setCounter={setCounter}
            setFavorites={setFavorites}
            setShowForm={setShowForm}
            setRecipeLoading={setRecipeLoading}
            key={() => {
              let count = 0;
              count++;
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

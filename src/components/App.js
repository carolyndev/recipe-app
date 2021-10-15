import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import RecipeDetails from './RecipeDetails';
import Favorites from './Favorites';
import Surprise from './Surprise';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showRecipes, setShowRecipes] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [uniqueFavorites, setUniqueFavorites] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);

  const API_KEY = '50aa27339ac74c17a68aefe745b2be28';

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

  const hideForm = () => {
    // setRecipes([]);
    setSearch('');
    setShowForm(false);
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
    <Router>
      <div className="App">
        <Header
          returnHome={returnHome}
          hideForm={hideForm}
          recipes={recipes}
          setRecipes={setRecipes}
          search={search}
          setSearch={setSearch}
          showForm={showForm}
          setShowForm={setShowForm}
          loading={loading}
          setLoading={setLoading}
          showRecipes={showRecipes}
          setShowRecipes={setShowRecipes}
        />
        <Main
          API_KEY={API_KEY}
          favorites={favorites}
          setFavorites={setFavorites}
          returnHome={returnHome}
          hideForm={hideForm}
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
              API_KEY={API_KEY}
              setShowForm={setShowForm}
              showForm={showForm}
              favorites={favorites}
              setFavorites={setFavorites}
              saveLocalFavorites={saveLocalFavorites}
              recipeLoading={recipeLoading}
              setRecipeLoading={setRecipeLoading}
            />
          )}
        />
        <Route path="/favorites">
          <Favorites
            returnHome={returnHome}
            showForm={showForm}
            setShowForm={setShowForm}
            favorites={favorites}
            setFavorites={setFavorites}
            recipes={recipes}
            setRecipes={setRecipes}
            uniqueFavorites={uniqueFavorites}
            setUniqueFavorites={setUniqueFavorites}
            saveLocalFavorites={getLocalFavorites}
          />
        </Route>
        <Route path="/surprise">
          <Surprise
            API_KEY={API_KEY}
            saveLocalFavorites={saveLocalFavorites}
            favorites={favorites}
            setFavorites={setFavorites}
            showForm={showForm}
            setShowForm={setShowForm}
            recipeLoading={recipeLoading}
            setRecipeLoading={setRecipeLoading}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

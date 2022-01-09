import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import RecipePage from './RecipePage';
import Favorites from './Favorites';
import Surprise from './Surprise';

const API_KEY = '50aa27339ac74c17a68aefe745b2be28';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [uniqueFavorites, setUniqueFavorites] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

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

  const animationReset = (e) => {
    e.target.classList.remove('ripple');
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
          animationReset={animationReset}
          favorites={favorites}
          setFavorites={setFavorites}
          loading={loading}
          setLoading={setLoading}
          recipes={recipes}
          setRecipes={setRecipes}
          search={search}
          setSearch={setSearch}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </div>

      <Switch>
        <Route
          path="/recipe/:id"
          exact
          render={(props) => (
            <RecipePage
              {...props}
              API_KEY={API_KEY}
              animationReset={animationReset}
              saveLocalFavorites={saveLocalFavorites}
              // getLocalRecipes={getLocalRecipes}
              setShowForm={setShowForm}
              setFavorites={setFavorites}
              recipeLoading={recipeLoading}
              setRecipeLoading={setRecipeLoading}
              ingredients={ingredients}
              setIngredients={setIngredients}
              instructions={instructions}
              setInstructions={setInstructions}
              details={details}
              setDetails={setDetails}
            />
          )}
        />
        <Route path="/favorites">
          <Favorites
            returnHome={returnHome}
            uniqueFavorites={uniqueFavorites}
            setFavorites={setFavorites}
            setRecipes={setRecipes}
            setShowForm={setShowForm}
          />
        </Route>
        <Route path="/surprise">
          <Surprise
            API_KEY={API_KEY}
            animationReset={animationReset}
            counter={counter}
            saveLocalFavorites={saveLocalFavorites}
            setFavorites={setFavorites}
            setShowForm={setShowForm}
            ingredients={ingredients}
            setIngredients={setIngredients}
            instructions={instructions}
            setInstructions={setInstructions}
            details={details}
            setDetails={setDetails}
            recipeLoading={loading}
            setRecipeLoading={setLoading}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

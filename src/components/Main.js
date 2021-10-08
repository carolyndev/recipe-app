import React, { useEffect } from 'react';
// import { Switch, Route } from 'react-router-dom';

import UserInput from './UserInput';
import RecipeList from './RecipeList';
// import RecipeDetails from './RecipeDetails';
// import Favorites from './Favorites';

const Main = (props, match) => {
  // console.log(match);
  const {
    clearResults,
    loading,
    setLoading,
    recipes,
    setRecipes,
    search,
    setSearch,
    showForm,
    setShowForm,
  } = props;

  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="main">
      {showForm === false ? (
        <></>
      ) : (
        <>
          <UserInput
            loading={loading}
            setLoading={setLoading}
            recipes={recipes}
            setRecipes={setRecipes}
            search={search}
            setSearch={setSearch}
          />
          <RecipeList
            clearResults={clearResults}
            loading={loading}
            setLoading={setLoading}
            recipes={recipes}
            setRecipes={setRecipes}
            search={search}
            setSearch={setSearch}
          />
        </>
      )}

      {/* <Switch>
        <Route path="/recipe/:id" exact component={RecipeDetails} />
        <Route path="/favorites" component={Favorites} />
      </Switch> */}
    </div>
  );
};

export default Main;

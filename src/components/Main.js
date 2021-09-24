import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserInput from './UserInput';
import RecipeCards from './RecipeCards';
import RecipeDetails from './RecipeDetails';

const Main = (props) => {
  const { clearAll, recipes, setRecipes, search, setSearch } = props;

  return (
    <div className="main">
      <UserInput
        recipes={recipes}
        setRecipes={setRecipes}
        search={search}
        setSearch={setSearch}
      />
      <RecipeCards
        clearAll={clearAll}
        recipes={recipes}
        setRecipes={setRecipes}
      />

      <Switch>
        <Route path="/recipe/:id" exact component={RecipeDetails} />
      </Switch>
    </div>
  );
};

export default Main;

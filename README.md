## Recipeace - discover new recipes

Designed and built by Carolyn Lau

### Overview

Recipeace allows users to discover new recipes and cooking inspiration. As an API connected app, users are able to:

1.  Search for recipes by ingredient or recipe name.
2.  Navigate between pages of search results.
3.  View recipe details by clicking on a recipe card.
4.  Add recipes to the favorites list from the results page or recipe details page.
5.  Delete items from the favorites list.
6.  View a randomized recipe via the 'surprise me' button.

Search results and favorited recipes are saved to local storage.

### View Live Site

Live site URL: [[https://carolyndev.github.io/recipeace]](https://carolyndev.github.io/recipeace)

### Screenshots

![recipeace-landing](./src/images/screenshots/recipeace.png)
![recipe-details](./src/images/screenshots/recipe-details.png)

### Built with

- Tailwind CSS [[tailwindcss.com]](https://tailwindcss.com/)
- React JS Library [[reactjs.org]](https://reactjs.org/)
- React Router [[react-router-dom]](https://v5.reactrouter.com/web/guides/quick-start)
- Spoonacular API [[spoonacular.com]](https://spoonacular.com/)
- Bootstrapped with [[Create React App]](https://github.com/facebook/create-react-app)

### Set-up

1. Clone this repository to your desktop. [[https://github.com/carolyndev/recipeace.git]](https://github.com/carolyndev/recipeace.git)
2. From your device's terminal, `cd` into the project directory.
3. Run `npm start` to open the app in the development mode and view it in your browser. [[localhost:3000]](http://localhost:3000)
4. Run `npm run build` to create your optimized production build.

### Project Goals and Challenges

As a recipe discovery app, it is important for users save favorite recipes, and to have access to those even on page reload. Search results and favorited recipes are saved to local storage. I also wanted the option to view more search results, and therefore implemented the pagination functionality.

Due to the client-side-rendering of React Router, my application would encounter a 404 error if the user refreshed the app after navigating from the home page. Special thanks to Rafael Pedicini for the redirect script.

### Continued development

I am growing more comfortable passing props and managing `useEffect` hooks. In future projects, I would like to implement custom hooks to manage the API calls.

As the size of my application grows, managing state and passing props across components can get bulky. In future projects, I would like to implement a state management library such as React Redux to streamline my data.

### Acknowledgements

Page refresh redirect script courtesy of [Rafael Pedicini](https://github.com/rafgraph/spa-github-pages).

import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

const Favorites = (props) => {
  const { showForm, setShowForm } = props;
  useEffect(() => {
    setShowForm(false);
  }, []);
  return <div>Favorite recipes</div>;
};

export default Favorites;

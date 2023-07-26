import { NavLink } from 'react-router-dom';

export const Navigate = () => {
  return (
    <div>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to="/movies">Movies</NavLink>
      </div>
    </div>
  );
};

import { NavLink } from 'react-router-dom';
import s from './navigate.module.css';
export const Navigate = () => {
  return (
    <div className={s.flexnavigate}>
      <div className={s.home}>
        <NavLink className={s.homes} to="/">
          Home
        </NavLink>
      </div>
      <div className={s.movies}>
        <NavLink className={s.movie} to="/movies">
          Movies
        </NavLink>
      </div>
    </div>
  );
};

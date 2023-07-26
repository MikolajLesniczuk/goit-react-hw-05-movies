import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from 'services/service';
// import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
// import { IMAGE_URL } from 'services/service';
import s from './home.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await fetchTrendingMovies();

      setMovies(results);
    };

    getMovies();
  }, []);

  const handleNavigate = id => {
    navigate(`/movies/${id}`);
  };
  return (
    <>
      <h1>Tranding today</h1>

      {movies &&
        movies.map(({ id, title, backdrop_path }) => (
          <ul key={id}>
            <li className={s.flexList}>
              <img
                className={s.imagesMovie}
                alt={title}
                src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              ></img>
              <div className={s.listMovie}>
                <p className={s.title}>{title}</p>

                <button className={s.button} onClick={() => handleNavigate(id)}>
                  More Details
                </button>
              </div>
            </li>
          </ul>
        ))}
    </>
  );
};

export { HomePage };

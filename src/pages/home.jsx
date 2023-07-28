import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from 'services/service';
// import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
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
      <h1 className={s.titlepopular}>Popular today : </h1>
      <div className={s.flexmain}>
        {movies &&
          movies.map(
            ({ id, title, poster_path }) =>
              poster_path && (
                <ul className={s.ullist} key={id}>
                  <li className={s.flexList}>
                    <img
                      className={s.imagesMovie}
                      alt={title}
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    ></img>
                    <div className={s.listMovie}>
                      <p className={s.title}>{title}</p>

                      <button
                        className={s.button}
                        onClick={() => handleNavigate(id)}
                      >
                        More Details
                      </button>
                    </div>
                  </li>
                </ul>
              )
          )}
      </div>
    </>
  );
};

export default HomePage;

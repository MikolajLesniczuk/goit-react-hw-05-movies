import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchMovies } from 'services/service';
import s from '../HomePage/home.module.css';
import st from './movies.module.css';

const Movies = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieresult, setmovieresult] = useState([]);

  useEffect(() => {
    const queryFromURL = searchParams.get('query') || '';
    setQuery(queryFromURL);
  }, [searchParams]);

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== '') {
      setSearchParams({ query: value });
    } else {
      setSearchParams(params => {
        params.delete('query');
        return params;
      });
    }
  };

  const fetchMovies = async () => {
    const data = await searchMovies(query);
    const results = data.results;
    setmovieresult(results);
  };

  useEffect(() => {
    if (query !== '') {
      fetchMovies();
    } else {
      setmovieresult([]);
    }
    // eslint-disable-next-line
  }, [query]);

  const handleNavigated = id => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      <div>
        <form className={st.form} onSubmit={e => e.preventDefault()}>
          <input
            className={st.input}
            type="text"
            value={query}
            placeholder="search movies"
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div>
        {' '}
        <div className={s.flexmain}>
          {movieresult.length !== 0
            ? movieresult.map(
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
                            onClick={() => handleNavigated(id)}
                          >
                            More Details
                          </button>
                        </div>
                      </li>
                    </ul>
                  )
              )
            : query !== '' && (
                <p className={s.alert}>There is nothing, try again </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Movies;

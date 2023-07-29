import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/service';
import s from './cast.module.css';
export const Cast = () => {
  const { movieId } = useParams();

  const [obsada, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const result = await getMovieCast(movieId);
      const casts = result.cast;
      setCast(casts);
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      {obsada.map(
        ({ name, character, profile_path }) =>
          profile_path && (
            <div className={s.flexcast} key={nanoid()}>
              <div>
                <img
                  className={s.castimage}
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={name}
                ></img>
              </div>
              <div>
                <ul>
                  <li className={s.infocast}>{name}</li>
                  <li className={s.infocast}>Character : {character}</li>
                </ul>
              </div>
            </div>
          )
      )}
    </div>
  );
};

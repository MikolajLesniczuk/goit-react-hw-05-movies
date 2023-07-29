import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../pages/notFound/notFound';

import { MovieDetails } from 'pages/movieDetails/movieDetails';
import { Cast } from 'pages/cast/cast';
import { Reviews } from 'pages/ReviewsList/reviews';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage/home'));
const CommonLayout = lazy(() => import('../pages/commonLayout/commonLayout'));

const Movies = lazy(() => import('../pages/MoviesList/movies'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

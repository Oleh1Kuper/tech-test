import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import ProfilePage from './pages/ProfilePage';
import Form from './pages/Form';
import HomePage from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/form', element: <Form /> },
    ],
  },
]);

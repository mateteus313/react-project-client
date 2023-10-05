import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Main from './Main';
import Home from './routes/Home';
import LoginForm from './routes/Login.js';
import RegistrationForm from './routes/Register.js';
import Central from './routes/Central.js'

//const router = createBrowserRouter([
//  {
//    path: "/",
//    element: <Home />,
//  },
//  {
//    path: "/register",
//    element: <RegistrationForm />,
//  },
//]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegistrationForm />,
      },
      {
        path: "/central",
        element: <Central />,
      },
    ]
  },
]);

function App() {

  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
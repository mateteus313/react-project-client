import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Home from './routes/Home';
import RegistrationForm from './routes/Register';
import LoginForm from './routes/Login';
import Main from './Main';

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
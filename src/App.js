import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Main';
import LoginForm from './routes/Login.js';
import RegistrationForm from './routes/Register.js';
import Central from './routes/Central.js'
import Error from './routes/Error.jsx'
import { PrivateRoute } from './auth.js';
import { CookiesProvider } from 'react-cookie';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegistrationForm />,
      },
      {
        path: "/central",
        element:
        <CookiesProvider>
          <PrivateRoute>
            <Central />
          </PrivateRoute> 
        </CookiesProvider>
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
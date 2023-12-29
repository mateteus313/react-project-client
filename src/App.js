import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './routes/Login.jsx';
import RegistrationForm from './routes/Register.jsx';
import Central from './routes/Central.jsx'
import { PrivateRoute } from './auth.js';
import { CookiesProvider } from 'react-cookie';
import Error from './routes/Error.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
    errorElement: <Error/>,
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
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
import React from 'react'

import { Outlet } from 'react-router-dom';

// Modelo principal onde poderá ser incluso o restante do conteudo das paginas
const Main = () => {
  return (
    <div>
      <h1 style={{
        color: 'red',
        fontSize: '20px',
        textAlign: 'center'
      }}>Projeto React - Matheus</h1>
      
      {/*<Navbar />*/}

      <Outlet />
      
    </div>
  )
}
export default Main;

import React from 'react'
import { Outlet } from 'react-router-dom';

// Modelo principal onde poderá ser incluso o restante do conteudo das paginas
const Main = () => {
  return (
    <div>
      
      <Outlet />
      
    </div>
  )
}
export default Main;

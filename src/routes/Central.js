import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';


const Central = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <Sidebar style={{backgroundColor: '#171d52'}}>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem onClick={logout}> Sair </MenuItem>
        </Menu>
    </Sidebar>;
    </div>
  )
}
export default Central;

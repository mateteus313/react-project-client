import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


const Central = () => {

  return (
    <div>
      <Sidebar style={{backgroundColor: '#171d52'}}>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Sair </MenuItem>
        </Menu>
    </Sidebar>;
    </div>
  )
}
export default Central;

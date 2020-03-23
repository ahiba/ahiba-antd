import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={'0'} onSelect={(index) => {alert(index)}} mode="vertical"
        defaultOpenSubMenus={['2']}
      >
        <MenuItem>
          cool link
        </MenuItem>
        <MenuItem disabled>
          cool link 2
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            dropdown 1
          </MenuItem>
          <MenuItem>
            dropdown 2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          cool link 3
        </MenuItem>
      </Menu>
      <Button onClick={e => {
        console.log(134)
      }}>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large} className="klass">hello</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">hello</Button>
    </div>
  );
}

export default App;

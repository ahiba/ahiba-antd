import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'


import './styles/index.scss'

library.add(fas)

function App() {
  const [ show, setShow ] = useState(false)
  return (
    <div className="App">
      <Button size={ButtonSize.Large} onClick={() => {setShow(!show)}}>Toggle</Button>
      
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-left"
      >
        <div>
          <p>edit <code>src/App.tsx</code> and save to reload</p>
          <p>edit <code>src/App.tsx</code> and save to reload</p>
          <p>edit <code>src/App.tsx</code> and save to reload</p>
          <p>edit <code>src/App.tsx</code> and save to reload</p>
          <p>edit <code>src/App.tsx</code> and save to reload</p>
        </div>
      </Transition>
      <Icon icon="coffee" theme="danger" size="10x"  />
      <Menu 
        defaultIndex={'0'} 
        onSelect={(index) => {alert(index)}} 
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

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
import Alert from './components/Alert/alert'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'


import './styles/index.scss'

library.add(fas)

function App() {
  const [ show, setShow ] = useState(false)
  const [ alertShow, setAlertShow ] = useState(true)
  console.log('当前的alertShow', alertShow)
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
      <div
        style={{
          padding: '20px 40px',
          width: '500px'
        }}
      >
        <h3 onClick={() => {
          console.log('点击了改变alert closeable', alertShow)
          setAlertShow(!alertShow)
        }}>
          组件演示 + {JSON.stringify(alertShow)}
        </h3>
        <Alert
          closeable={alertShow}
          description="this is a long description"
          onClose={function noRefCheck(){
            console.log('执行了关闭')
          }}
          title="提示标题欧亲"
          type="default"
        />
      </div>
      <div
        style={{
          padding: '20px 40px',
          width: '500px'
        }}
      >
        <h3>
          组件演示
        </h3>
        <Tabs
          defaultIndex={0}
          onSelect={function noRefCheck(){}}
          type="card"
        >
          <TabItem label={<><Icon icon="exclamation-circle" />{'  '}自定义图标</>}>
            this is card one
          </TabItem>
          <TabItem label="tab2">
            this is content two
          </TabItem>
          <li>123</li>
        </Tabs>
      </div>
    </div>
    
  );
}

export default App;

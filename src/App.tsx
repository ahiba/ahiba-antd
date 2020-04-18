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
import Input from './components/Input/input'
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete'
import Upload from './components/Upload/upload'

import './styles/index.scss'

library.add(fas)

interface LakerPlayreProps {
  value: string;
  number: number;
}
function App() {
  const [ show, setShow ] = useState(false)
  const [ alertShow, setAlertShow ] = useState(true)

  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const lakersWithNumber = [
    {value:'bradley', number:23},
    {value:'pope', number:33},
    {value:'caruso', number:43},
    {value:'cook', number:53},
    {value:'cousins', number:63},
    {value:'james', number:73},
  ]
  // const handelFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query))
  // }
  // const handelFetch = (query:string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query))
  // }
  const handelFetch = (query:string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({ items }) =>{
      console.log(items)
      const formatItems = items.slice(0,10).map((item:any) => (
        {
          value: item.login, ...item
        }
      ))
      return formatItems
    })
  }
  const renderOption = (item:DataSourceType<LakerPlayreProps>) =>{
    return (
      <>
        <h2>Name:{item.value}</h2>
        <p>Number:{item.number}</p>
      </>
    )
  }
  // const renderOption = (item:string) =>{
  //   return (
  //     <h2>Name:{item}</h2>
  //   )
  // }
  return (
    <div className="App">
      <Upload 
        action="http://baidu.com"
        name="file"
        data={{"key": "value"}}
        multiple={true}
        drag={true}
      >
         <Button btnType={ButtonType.Primary} size={ButtonSize.Large} className="klass">hello</Button>
      </Upload>
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
      <Input size='lg' disabled placeholder="lg" />
      <Input size='sm' disabled placeholder="sm" />
      <Input icon="address-book" prepend="http://" />
      <AutoComplete 
        fetchSuggestions={handelFetch} 
        renderOption={renderOption}/>

    </div>
    
  );
}

export default App;

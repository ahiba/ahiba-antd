import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <Button onClick={e => {
        console.log(134)
      }}>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">hello</Button>
    </div>
  );
}

export default App;

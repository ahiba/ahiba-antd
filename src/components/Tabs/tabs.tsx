import React, { useState } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

export interface TabsProps {
  defaultIndex?: number;
  className?: string;
  onSelect?: (selectIndex: number) => void;
  type?: 'line' | 'card'
}

const Tabs:React.FC<TabsProps> = (props) => {
  let { defaultIndex, className, onSelect, type, children } = props
  let [ activeIndex, setActiveIndex ] = useState(defaultIndex)

  const navClass = classNames('viking-tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  })

  const handleClick = (index:number, disabled:any) => {
    if(!disabled) {
      setActiveIndex(index)
      if(onSelect) {
        onSelect(index)
      }
    }
  }
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const  { displayName } = childElement.type
      if(displayName === 'TabItem') {
        let { label, disabled } = childElement.props
        let classes = classNames('viking-tabs-nav-item', {
          'is-active': activeIndex === index,
          'disabled': disabled,
        })
        return (
          <li className={classes} key={'nav-item-' + index} onClick={() => {
            handleClick(index, disabled)
          }}>{label}</li>
        )
      } else {
        console.error("Warning: Menu has a child which is not a TabItem Component")
      }
    })
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if(index === activeIndex) {
        return child
      }
    })
  }

  return (
    <div className={"viking-tabs " + className}>
      <ul className={navClass}>
        {renderNavLinks()}
      </ul>
      <div className="viking-tabs-content">
        {renderContent()}
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line'
}

export default Tabs
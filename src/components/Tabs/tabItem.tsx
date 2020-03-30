import React from 'react'
import classNames from 'classnames'

export interface TabItemProps {
  label: string | React.ReactElement;
  disabled?: boolean;
}

const TabItem:React.FC<TabItemProps> = (props) => {
  let { children } = props;
  return (
    <div className="viking-tab-panel">
      {children}
    </div>
  )
}

TabItem.displayName = 'TabItem'
export default TabItem
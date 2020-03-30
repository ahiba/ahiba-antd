import React, { useState } from 'react'
import classNames from 'classnames'
import Transition  from '../Transition/transition'
import Icon from '../Icon/icon'

type typeMdoe = 'success' | 'default' |　'danger' | 'warning'
type closeCallBack = () => void

interface AlertProps {
  title: String;
  description?: String;
  type?: typeMdoe;
  onClose?: closeCallBack;
  closeable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => { 
  const { title, description, type, onClose, closeable } = props
  const [ hide, setHide ] = useState(false)
  const classes = classNames('viking-alert', 
    {
      [`viking-alert-${type}`]:type,
    }
  )
  const titleClass = classNames('viking-alert-title', {
    'bold-title': description
  })
  const handleClose = () => {
    if(onClose) {
      onClose()
    }
    setHide(true)
  }
  return (
    <>
      {
        !hide && 
        <Transition
          in={!hide}
          timeout={300}
          animation="zoom-in-top"
        >
          <div className={classes}>
            <span className={titleClass}>{title}</span>
            {description && <p className="viking--desc">{description}</p>}
            {closeable && <span className="viking-alert-close" onClick={handleClose}><Icon icon="times"></Icon></span>}
          </div>
        </Transition>
      }
    </>

  )
}

Alert.defaultProps = {
  onClose: () => {},
  type: 'default',
  closeable: true,
}
export default Alert


import React, { useState } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
var Alert = function (props) {
    var _a;
    var title = props.title, description = props.description, type = props.type, onClose = props.onClose, closeable = props.closeable;
    var _b = useState(false), hide = _b[0], setHide = _b[1];
    var classes = classNames('viking-alert', (_a = {},
        _a["viking-alert-" + type] = type,
        _a));
    var titleClass = classNames('viking-alert-title', {
        'bold-title': description
    });
    var handleClose = function () {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };
    return (React.createElement(React.Fragment, null, !hide &&
        React.createElement(Transition, { in: !hide, timeout: 300, animation: "zoom-in-top" },
            React.createElement("div", { className: classes },
                React.createElement("span", { className: titleClass }, title),
                description && React.createElement("p", { className: "viking--desc" }, description),
                closeable && React.createElement("span", { className: "viking-alert-close", onClick: handleClose },
                    React.createElement(Icon, { icon: "times" }))))));
};
Alert.defaultProps = {
    onClose: function () { },
    type: 'default',
    closeable: true,
};
export default Alert;

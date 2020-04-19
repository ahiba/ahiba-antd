import React, { useState } from 'react';
import classNames from 'classnames';
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, type = props.type, children = props.children;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var navClass = classNames('viking-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });
    var handleClick = function (index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabItem') {
                var _a = childElement.props, label = _a.label, disabled_1 = _a.disabled;
                var classes = classNames('viking-tabs-nav-item', {
                    'is-active': activeIndex === index,
                    'disabled': disabled_1,
                });
                return (React.createElement("li", { className: classes, key: 'nav-item-' + index, onClick: function () {
                        handleClick(index, disabled_1);
                    } }, label));
            }
            else {
                console.error("Warning: Menu has a child which is not a TabItem Component");
            }
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: "viking-tabs " + className },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: "viking-tabs-content" }, renderContent())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line'
};
export default Tabs;
